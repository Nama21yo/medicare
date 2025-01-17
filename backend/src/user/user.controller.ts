import {
  Controller,
  Get,
  Post,
  Param,
  Body,
  UnauthorizedException,
  BadRequestException,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { User } from './user.entity';
import { JwtService } from '@nestjs/jwt';
import { Request, Response } from 'express';
import { TokenService } from './token.service';
import { Roles } from 'src/roles/decorator/roles.decorator';
import { RolesGuard } from 'src/roles/roles.guard';
import { BranchService } from 'src/branch/branch.service';
import { BranchSignupDto } from 'src/branch/dto/BranchSignUpDto.dto';
import { DoctorService } from 'src/doctor/doctor.service';
import { DoctorSignupDto } from 'src/doctor/dto/doctorSignUp.dto';
import { ReceptionistService } from 'src/receptionist/receptionist.service';
import { ReceptionistSignupDto } from 'src/receptionist/dto/receptionistSignup.dto';
import * as bcryptjs from 'bcryptjs';

@Controller('v1/users')
@UseGuards(RolesGuard)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly tokenService: TokenService,
    private readonly branchService: BranchService,
    private readonly doctorService: DoctorService,
    private readonly receptionistService: ReceptionistService,
  ) {}

  /**
   * @route GET /v1/users
   * @description Fetch all users (admin only)
   */
  @Get()
  // @Roles('headoffice') // Only admin can access this route
  async findAll(): Promise<User[]> {
    return this.userService.findAll();
  }

  /**
   * @route GET /v1/users/user
   * @description Fetch the authenticated user
   */
  @Get('user')
  @Roles('receptionist', 'doctor', 'branch', 'headoffice') // Accessible by specified roles
  async user(@Req() request: Request): Promise<User> {
    const token = request.headers.authorization?.replace('Bearer ', '');
    if (!token) {
      throw new UnauthorizedException('Token not provided');
    }

    const { id } = await this.jwtService.verifyAsync(token);
    return this.userService.findById(id);
  }

  /**
   * @route POST /v1/branches/signup
   * @description Sign up as a branch
   */
  @Post('branches/signup/:email')
  async branchSignup(
    @Param('email') email: string,
    @Body() dto: BranchSignupDto,
  ): Promise<{ user: User; branch: any; token: string }> {
    const user = await this.userService.create({
      email,
      username: dto.name,
      password: dto.password,
      roleId: 2, // Role ID for branch
    });

    const token = await this.jwtService.signAsync({
      id: user.user_id,
      role: user.role.name,
    });

    const branch = await this.branchService.signup(email, dto);
    return { user, branch, token };
  }

  /**
   * @route POST /v1/doctors/signup
   * @description Sign up as a doctor
   */
  @Post('doctors/signup/:email')
  async doctorSignup(
    @Param('email') email: string,
    @Body() dto: DoctorSignupDto,
  ): Promise<{ user: User; doctor: any; token: string }> {
    const user = await this.userService.create({
      email,
      username: dto.name,
      password: dto.password,
      roleId: 4, // Role ID for doctor
    });

    const token = await this.jwtService.signAsync({
      id: user.user_id,
      role: user.role.name,
    });

    const doctor = await this.doctorService.signup(email, dto);
    return { user, doctor, token };
  }

  /**
   * @route POST /v1/receptionists/signup
   * @description Sign up as a receptionist
   */
  @Post('receptionists/signup/:email')
  async receptionistSignup(
    @Param('email') email: string,
    @Body() dto: ReceptionistSignupDto,
  ): Promise<{ user: User; receptionist: any; token: string }> {
    const user = await this.userService.create({
      email,
      username: dto.name, // Receptionist username is optional
      password: dto.password,
      roleId: 5, // Role ID for receptionist
    });

    const token = await this.jwtService.signAsync({
      id: user.user_id,
      role: user.role.name,
    });

    const receptionist = await this.receptionistService.signup(email, dto);
    return { user, receptionist, token };
  }

  /**
   * @route POST /v1/users/login
   * @description Authenticate a user and return tokens
   */
  @Post('login')
  async login(
    @Body('email') email: string,
    @Body('password') password: string,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ token: string }> {
    const user = await this.userService.findByEmail(email);

    if (!user) {
      throw new BadRequestException('Invalid email or password');
    }

    const isPasswordValid = await bcryptjs.compare(password, user.password);
    if (!isPasswordValid) {
      throw new BadRequestException('Invalid email or password');
    }

    const accessToken = await this.jwtService.signAsync(
      { id: user.user_id, role: user.role },
      { expiresIn: '10m' },
    );

    const refreshToken = await this.jwtService.signAsync(
      { id: user.user_id },
      { expiresIn: '7d' },
    );

    await this.tokenService.create(
      user.user_id,
      refreshToken,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );

    response.cookie('refresh_token', refreshToken, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    return { token: accessToken };
  }
}

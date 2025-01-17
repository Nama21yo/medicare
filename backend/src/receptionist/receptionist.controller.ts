import { Controller, Post, Body, Param, UseGuards } from '@nestjs/common';
import { ReceptionistService } from './receptionist.service';
import { AddReceptionistDto } from './dto/addReceptionistDto.dto';
import { ReceptionistSignupDto } from './dto/receptionistSignup.dto';
import { RolesGuard } from 'src/roles/roles.guard';
import { Roles } from 'src/roles/decorator/roles.decorator';

@Controller('v1/receptionists')
@UseGuards(RolesGuard)
export class ReceptionistController {
  constructor(private readonly receptionistService: ReceptionistService) {}

  @Post()
  @Roles('headoffice', 'branch')
  async addReceptionist(@Body() dto: AddReceptionistDto) {
    return this.receptionistService.addReceptionist(dto);
  }

  // @Post('signup/:email')
  // async signup(
  //   @Param('email') email: string,
  //   @Body() dto: ReceptionistSignupDto,
  // ) {
  //   return this.receptionistService.signup(email, dto);
  // }
}

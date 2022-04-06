import { Body, Controller, Get, Post } from '@nestjs/common';
import { reserverSpotDto } from './dto';
import { freeSpotDto } from './dto/free-spot.dto';
import { SpotService } from './spot.service';

@Controller('spot')
export class SpotController {
  constructor(private spotService: SpotService) {}

  @Post('reserve')
  reserve(@Body() dto: reserverSpotDto) {
    this.spotService.reserve(dto);
  }

  @Get('freespots')
  freeSpots(@Body() dto: freeSpotDto) {
    this.spotService.freespots(dto);
  }
}

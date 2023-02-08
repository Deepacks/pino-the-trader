import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { ListingService } from './listing.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { ListingDto } from './dto/listing-dto.type';

@Controller('listing')
export class ListingController {
  constructor(private listngService: ListingService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createListing(@Body() listingDto: ListingDto) {
    return this.listngService.createListing(listingDto);
  }
}

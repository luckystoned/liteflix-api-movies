import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse } from '@nestjs/swagger';
import { Movie } from '../../database/schemas/movie.schema';
import { CreatMovieRequest } from './dto/create-movie.dto';

import { MovieResponseDto } from './dto/movie-response.dto';
import { MovieService } from './movie.service';

@Controller('/movie')
export class MovieController {
  constructor(private readonly movieService: MovieService) {}

  @Post('/')
  @ApiCreatedResponse({
    description: 'Movie created successfully',
    type: MovieResponseDto,
  })
  createMovie(@Body() body: CreatMovieRequest): Promise<Movie> {
    return this.movieService.createMovie(body);
  }

  @Get('/')
  @ApiOkResponse({
    description: 'Movies returned successfully',
    type: [MovieResponseDto],
  })
  getMovies(): Promise<Movie[]> {
    return this.movieService.getMovies();
  }
}

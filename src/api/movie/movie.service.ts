import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Logger } from '@nestjs/common/services/logger.service';
import { Movie, MovieDocument } from '../../database/schemas/movie.schema';
import { MovieResponseDto } from './dto/movie-response.dto';

@Injectable()
export class MovieService {
  constructor(
    private readonly logger: Logger,
    @InjectModel(Movie.name) private movieModel: Model<MovieDocument>,
  ) {}

  async createMovie(body: { title: string; imgUrl: string }): Promise<Movie> {
    try {
      let movie = new this.movieModel(body);

      movie = await movie.save();

      this.logger.log(
        `New movie named ${body.title} has been created successfully`,
      );

      return movie;
    } catch (error) {
      this.logger.error(
        `There was an error creating new movie named ${body.title}`,
      );

      throw error;
    }
  }

  async getMovies(): Promise<MovieResponseDto[]> {
    try {
      const modelMovies = await this.movieModel.find().lean().exec();

      this.logger.log('Movies returned successfully');

      const movies = modelMovies.map((movie) => {
        return {
          id: movie._id.toString(),
          title: movie.title,
          imgUrl: movie.imgUrl,
        };
      });

      return movies;
    } catch (error) {
      this.logger.error(`There was an error returning movies`);

      throw error;
    }
  }
}

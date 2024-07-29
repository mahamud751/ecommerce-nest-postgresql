import {
  Controller,
  Post,
  Body,
  Put,
  Delete,
  Get,
  Param,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiBearerAuth,
} from '@nestjs/swagger'; // Import Swagger decorators
import { UsersService } from './users.service';
import CreateUserDto from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import Roles from '../auth/roles.decorator';
import RolesGuard from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('users') // Tag for grouping endpoints
@Controller('users')
@UseGuards(RolesGuard)
@ApiBearerAuth() // Add this if JWT authentication is used
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('login')
  @ApiOperation({ summary: 'Login a user' })
  @ApiResponse({ status: 200, description: 'User logged in successfully.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  async loginUser(@Body() loginUserDto: LoginUserDto) {
    return this.usersService.loginUser(loginUserDto);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update user details' })
  @ApiResponse({
    status: 200,
    description: 'The user has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUser(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUser(id, updateUserDto);
  }

  @Put('password')
  @ApiOperation({ summary: 'Update user password' })
  @ApiResponse({ status: 200, description: 'Password updated successfully.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  async updatePassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usersService.updatePassword(updatePasswordDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a user' })
  @ApiResponse({ status: 200, description: 'User deleted successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async deleteUser(@Param('id') id: string) {
    return this.usersService.deleteUser(id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user details by ID' })
  @ApiResponse({
    status: 200,
    description: 'User details retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getUser(@Param('id') id: string) {
    return this.usersService.getUser(id);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, description: 'Users retrieved successfully.' })
  async getUsers() {
    return this.usersService.getUsers();
  }

  @Get('admin')
  @Roles('admin')
  @ApiOperation({ summary: 'Get admin user by email' })
  @ApiResponse({
    status: 200,
    description: 'Admin user retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Admin user not found.' })
  async getAdmin(@Query('email') email: string) {
    return this.usersService.getAdmin(email);
  }

  @Get('vendors')
  @ApiOperation({ summary: 'Get all vendor users' })
  @ApiResponse({ status: 200, description: 'Vendors retrieved successfully.' })
  async getVendors() {
    return this.usersService.getVendors();
  }

  @Get('token')
  @ApiOperation({ summary: 'Get JWT token for a user' })
  @ApiResponse({ status: 200, description: 'Token generated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async getJWT(@Query('email') email: string) {
    return this.usersService.getJWT(email);
  }

  @Put('admin/:id')
  @ApiOperation({ summary: 'Update admin user details' })
  @ApiResponse({ status: 200, description: 'Admin user updated successfully.' })
  @ApiResponse({ status: 404, description: 'User not found.' })
  async updateUserAdmin(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.updateUserAdmin(id, updateUserDto);
  }
}

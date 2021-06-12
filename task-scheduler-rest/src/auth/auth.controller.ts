import { Body, Controller, Post, ValidationPipe, Req, UseGuards } from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { AuthService } from "./auth.service";
import { AuthCredentialsDto } from "./dto/auth-credentials.dto";
import { GetUser } from "./customDecorator/get-user.decorator";
import { User } from "./user.entity";

@Controller("auth")
export class AuthController {
    constructor(
        private authService: AuthService,
    ) {}

    @Post("/signup")
    signUp(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.signUp(authCredentialsDto);
    }

    @Post("/signin") 
    signIn(@Body(ValidationPipe) authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.signIn(authCredentialsDto);
    }

    @Post("/test")
    @UseGuards(AuthGuard())
    test(@Req() req) {
        console.log(req.user)
    }
}
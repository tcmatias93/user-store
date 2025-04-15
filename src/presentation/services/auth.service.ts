import { bcryptAdapter, JwtAdapter } from "../../config";
import { UserModel } from "../../data";
import {
  CustomError,
  RegisterUserDto,
  UserEntity,
  LoginUserDto,
} from "../../domain";

export class AuthService {
  //DI
  constructor() {}

  public async registerUser(registerUserDto: RegisterUserDto) {
    const { name, email, password } = registerUserDto;

    const existUser = await UserModel.findOne({ email: email });

    if (existUser) throw CustomError.badRequest("Email already exist");

    try {
      const user = new UserModel(registerUserDto);

      //Encriptar la constraseña
      user.password = bcryptAdapter.hash(registerUserDto.password);

      await user.save();
      // JWT <----- para mantener la autenticacion del usuario

      // Email de confirmacion

      const { password, ...rest } = UserEntity.fromObject(user);

      return { user: rest, token: "abc" };
    } catch (error) {
      throw CustomError.internalServer(`${error}`);
    }
  }

  public async loginUser(loginUserDto: LoginUserDto) {
    const existUser = await UserModel.findOne({ email: loginUserDto.email });

    if (!existUser)
      throw CustomError.badRequest("Email and/or password not exist");

    const isMatching = bcryptAdapter.compare(
      loginUserDto.password,
      existUser.password
    );

    if (!isMatching)
      throw CustomError.badRequest("Email and/or password is not valid");

    const { password, ...user } = UserEntity.fromObject(existUser);

    const token = await JwtAdapter.generateToken({ id: existUser.id });

    if (!token) throw CustomError.internalServer("Error while creatin JWT");

    return {
      user: user,
      token: token,
    };
  }
}

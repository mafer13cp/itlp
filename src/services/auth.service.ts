import {repository} from '@loopback/repository';
import {ServiceKeys as keys} from '../keys/service-keys';
import {Usuario} from '../models';
import {UsuarioRepository} from '../repositories';
import {EncryptDecrypt} from './encryptDecrypt.service';
const jwt = require('jsonwebtoken');

export class Auth {
  constructor(
    @repository(UsuarioRepository)
    public usuarioRepository: UsuarioRepository
    ) {

  }

  async Identify(id: string, password: string): Promise<Usuario | false> {
    let usuario = await this.usuarioRepository.findOne({where: {id:id}});
    if (usuario){
      let cryptPass = new EncryptDecrypt(keys.MD5).Ecrypt(password);
      let cryptPass2 = new EncryptDecrypt(keys.MD5).Ecrypt(cryptPass);
      console.log('pass: '+ password)
      console.log('usr: ' + usuario.contrasena);
      console.log('1: '+ cryptPass);
      console.log('2: '+ cryptPass2);
      if (usuario.contrasena == cryptPass2) {
        return usuario;
      }
    }
    return false;
  }

  async GenerateToken(usuario:Usuario){
    let token = jwt.sign({
      exp: keys.TOKEN_EXP_TIME,
      data: {
        _id: usuario.id,
        password: usuario.contrasena,
        role: '1',
        paterId: usuario.fk_rol
      }
    },
    keys.JWT_SECRET_KEY);
    return token;
  }
}

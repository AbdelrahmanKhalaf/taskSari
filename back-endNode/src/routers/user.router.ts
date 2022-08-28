import { AuthenticationMiddleware } from './../middleware/auth';
import { Iusers, User, validateUser } from './../models/user.model';
import { NextFunction, Response, Router, Request } from "express";

import becrypt from "bcryptjs"
const router: Router = Router();
/** 
 * @desc   POST Register
 * @route  POST /api/v1/user/singup
 * @access public
*/
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  const { name, password, confirmPassword, phone, email }: Iusers = req.body
  const { error }: any = validateUser(req.body);
  if (error) return res.status(400).send(error.details[0].message);
  const user = await User.find({ email: email })
  if (user[0]) {
    res.status(400).send({ error: "Email already taken!!" })
  }
  let nameUser = await User.findOne({ name: name });
  if (nameUser)
    return res.status(400).send({
      error_en: "that name already exist",
      error_ar: "هذا الاسم موجود بالفعل",
    });
  const vildeLowercase: any = /(?=.*?[a-z])/;
  const vildeCaptalercase: any = /(?=.*?[A-Z])/;
  if (!vildeCaptalercase.test(password))
    return res.status(400).send({
      error_en: "It must contain at least 1 uppercase alphabetic character",
      error_ar: " كلمة السر يجب أن يحتوي على حرف أبجدي واحد كبير على الأقل ",
    });
  if (!vildeLowercase.test(password))
    return res.status(400).send({
      error_en: "It must contain at least one lowercase alphabet",
      error_ar: " كلمةالسر يجب أن يحتوي على حرف أبجدي صغير واحد على الأقل",
    });
  if (password !== confirmPassword)
    return res.status(400).send({
      error_en: "Password does not match",
      error_ar: " كلمة السر غير متطابقة",
    });
  const salt = await becrypt.genSalt(10);
  const hashPassword = await becrypt.hash(password, salt);
  const hashConfriPassword = await becrypt.hash(confirmPassword, salt);
  const register = new User({
    name: name,
    password: hashPassword,
    confirmPassword: hashConfriPassword,
    email: email,
    phone: phone,
  })
  return register.save((err: any) => {
    console.log(err);
    if (!err) {
      return res.status(200).send({ data: register })

    }else{
      res.status(400).send(err)
    }
    return
  })
})
  ;
/** 
 * @desc   GET user get his profile and fache his address by id user
 * @route  GET /api/v1/user/:id
 * @access private
*/
router.get('/user', [AuthenticationMiddleware], async (Req: Request, res: Response) => {
  const user = await User.findOne({ _id: res.locals.user._id })
  res.status(200).send(user)
})
export default router;

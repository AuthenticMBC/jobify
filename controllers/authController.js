import User from '../models/User.js'
import { StatusCodes } from 'http-status-codes'
import { BadRequestError, UnAuthenticatedError } from '../errors/index.js'

const register = async (req, res) => {
    const { name, email, password } = req.body

    if (!name || !email || !password) {
        throw new BadRequestError('Please provide all values !')
    }

    const userAlreadyExist = await User.findOne({ email })
    if (userAlreadyExist) {
        throw new BadRequestError('Sorry email already in use, please provide another email !')
    }

    const user = await User.create({ name, email, password })
    const token = user.createJWT()
    res.status(StatusCodes.CREATED).json({
        user:
        {
            name: user.name,
            email: user.email,
            lastName: user.lastName,
            location: user.location
        },
        token,
        location: user.location
    })

}
const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        throw new BadRequestError('Please provide all values !')
    }

    const user = await User.findOne({ email }).select('+password')

    if (!user) {
        throw new UnAuthenticatedError('Invalid credentials !')
    }

    // console.log(user)

    const isPasswordCorrect = await user.comparePassword(password)
    if (!isPasswordCorrect) {
        throw new UnAuthenticatedError('Invalid credentials !')
    }

    const token = user.createJWT()
    user.password = undefined
    res.status(StatusCodes.OK).json({ user, token, location: user.location })
}
const updateUser = async (req, res) => {
    console.log(req.user)
    res.send('update user')
}

export { register, login, updateUser }
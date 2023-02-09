import validator from "validator"
import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: [true, 'Please provide name'],
        minlength: 3,
        maxlength: 20,
        trim: true
    },
    email: {
        type: String,
        require: [true, 'Please provide email'],
        validate: {
            validator: validator.isEmail,
            message: 'Please provide a valid email'
        },
        unique: true
    },
    password: {
        type: String,
        require: [true, 'Please provide password'],
        minlength: 6
    },
    lastName: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 20,
        default: 'lastName'
    },
    location: {
        type: String,
        trim: true,
        minlength: 3,
        maxlength: 20,
        default: 'My City'
    }
})

export default mongoose.model('User', UserSchema)
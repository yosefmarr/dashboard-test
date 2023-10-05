import User from '../models/User.mjs';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import Config from '../models/Config.mjs';

export const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email || !password) {
      throw new Error('Please provide both email and password');
    }

    const user = await User.findOne({
      where: { email: email },
      attributes: ['firstName', 'lastName', 'password', 'status'],
      include: [
        {
          model: Config,
          attributes: ['language', 'sessionTimeOut'],
        },
      ],
    });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    if (user.status !== 'active') {
      return res.status(401).json({ error: `User state is ${user.status}` });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json({
      status: 'success',
      message: 'Logged in successfully',
      token,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to login',
      error: error.message,
    });
  }
};

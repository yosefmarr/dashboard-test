import User from '../models/User.mjs';
import Config from '../models/Config.mjs';
import Role from '../models/Role.mjs';
import Permission from '../models/Permission.mjs';

const getUserData = async (req, res) => {
  try {
    if (!req.user) {
      throw new Error('User data not found');
    }

    const user = await User.findByPk(req.user.id, {
      attributes: ['firstName', 'lastName', 'status'],
      include: [
        { model: Config, attributes: ['language', 'sessionTimeOut'] },
        {
          model: Role,
          attributes: ['id', 'name', 'description'],
          include: [
            {
              model: Permission,
              attributes: ['id', 'path', 'name', 'icon', 'ref'],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });

    res.status(200).json({
      status: 'success',
      message: 'user data retrieved successfully',
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed to retrieve user data',
      error: error.message,
    });
  }
};

export { getUserData };

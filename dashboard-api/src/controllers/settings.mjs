import User from '../models/User.mjs';
import Config from '../models/Config.mjs';

const setLanguage = async (req, res) => {
  const { language } = req.body;
  try {
    if (!req.user) {
      throw new Error('User data not found');
    }
    if (!language || !['en', 'es'].includes(language)) {
      throw new Error('Invalid language format');
    }
    const user = await User.findByPk(req.user.id, { include: [Config] });
    await user.config.update({ language });
    res.status(200).json({
      status: 'success',
      message: 'language set successfully',
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Failed set language',
      error: error.message,
    });
  }
};

export { setLanguage };

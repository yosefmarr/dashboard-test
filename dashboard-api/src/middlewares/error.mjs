const errorHandler = (req, res) => {
  res.status(400);
  res.json({
    status: 'error',
    message: 'The requested resource could not be found',
    error: `${req.originalUrl} - ${req.method} - Not found`,
  });
};

export default errorHandler;

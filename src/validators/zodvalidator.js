export const validate = (schema) => {
  return async (req, res, next) => {
    try {
      console.log(req.body);
      schema.parse(req.body);
    } catch (error) {
      return res.status(400).json({
        error: error.errors,
        succes: false,
        message: "Validation failed",
      });
    }
    next();
  };
};

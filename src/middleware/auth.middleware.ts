const authMiddleware = (req: any, res: any, next: any) => {
  if (req.session.user) {
    next();
  } else {
    res.redirect("/login");
  }
};
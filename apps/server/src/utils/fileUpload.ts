import multer from "multer";
import path from "path";

const storage = multer({
  dest: "public/",
  limits: {
    fileSize: 1000000,
  },
  fileFilter: (req, file, cb) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
      return cb(new Error("Please upload an image"));
    }
    cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "public/");
    },
    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname);
      const fileName = `${Date.now()}-${
        file.originalname.replace(/\s/g, "-").split(".")[0]
      }${ext}`;
      cb(null, fileName);
    },
  }),
});

export default storage;

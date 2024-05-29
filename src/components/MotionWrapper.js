import { motion } from "framer-motion";
import React from "react";

const MotionWrapper = ({ children, ...rest }) => {
  return <motion.div {...rest}>{children}</motion.div>;
};

export default MotionWrapper;

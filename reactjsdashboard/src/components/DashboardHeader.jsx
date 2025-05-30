import React from "react";
import styled from "styled-components";
import { motion } from "framer-motion";

const HeaderContainer = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem 3rem;
  margin: 2rem;
  background: linear-gradient(135deg, #f7e8ff 0%, #ffe8f3 50%, #e8fff0 100%);
  border-radius: 30px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1),
    inset 0 -10px 20px rgba(255, 255, 255, 0.7);
  position: relative;
  overflow: hidden;

  /* Notebook paper lines */
  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: linear-gradient(
        90deg,
        transparent 24px,
        #ff9eae 24px,
        #ff9eae 26px,
        transparent 26px
      ),
      linear-gradient(#f3f3f3 1px, transparent 1px);
    background-size: 100% 28px;
    opacity: 0.1;
  }

  /* Decorative hole punches */
  &::after {
    content: "";
    position: absolute;
    left: 40px;
    top: 0;
    bottom: 0;
    width: 30px;
    background-image: radial-gradient(circle, #ff9eae 3px, transparent 3px);
    background-size: 100% 50px;
    background-position: center;
    background-repeat: repeat-y;
    opacity: 0.5;
  }
`;

const DecorationContainer = styled.div`
  position: absolute;
  top: 20px;
  right: 20px;
  display: flex;
  gap: 20px;
  z-index: 2;
`;

const Decoration = styled(motion.div)`
  width: 50px;
  height: 50px;
  background: ${(props) => props.color};
  border-radius: 50%;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1), inset 0 -3px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.5rem;
  cursor: pointer;
`;

const Title = styled(motion.h1)`
  font-size: 4rem;
  background: linear-gradient(45deg, #4a4a4a, #6a6a6a);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 1rem;
  font-family: "Comic Sans MS", cursive;
  text-shadow: 3px 3px 6px rgba(0, 0, 0, 0.2), 0 0 20px rgba(255, 255, 255, 0.8);
  position: relative;
  display: inline-block;
  letter-spacing: 2px;

  &::before,
  &::after {
    font-size: 3rem;
    -webkit-text-fill-color: initial;
  }

  &::before {
    content: "📚";
    margin-right: 20px;
    transform: rotate(-15deg);
    display: inline-block;
    filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
  }

  &::after {
    content: "✏️";
    margin-left: 20px;
    transform: rotate(15deg);
    display: inline-block;
    filter: drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.2));
  }
`;

const Subtitle = styled(motion.p)`
  font-size: 1.4rem;
  color: #666;
  margin-top: 1.5rem;
  font-family: "Comic Sans MS", cursive;
  position: relative;
  display: inline-block;
  padding: 0.8rem 3rem;
  background: rgba(255, 255, 255, 0.7);
  border-radius: 30px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.05);
  backdrop-filter: blur(5px);

  &::before {
    content: "📌";
    margin-right: 12px;
    display: inline-block;
    transform: rotate(-45deg);
    filter: drop-shadow(2px 2px 2px rgba(0, 0, 0, 0.1));
  }
`;

const DashboardHeader = () => {
  return (
    <HeaderContainer
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, type: "spring", bounce: 0.5 }}
    >
      <DecorationContainer>
        <Decoration
          color="#FFB5B5"
          whileHover={{ scale: 1.2, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          📝
        </Decoration>
        <Decoration
          color="#B5E6B5"
          whileHover={{ scale: 1.2, rotate: -360 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          📎
        </Decoration>
        <Decoration
          color="#D7B5FF"
          whileHover={{ scale: 1.2, rotate: 360 }}
          whileTap={{ scale: 0.9 }}
          transition={{ duration: 0.5 }}
        >
          🎨
        </Decoration>
      </DecorationContainer>

      <Title
        initial={{ scale: 0.8, rotate: -5 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          duration: 1,
          type: "spring",
          bounce: 0.4,
        }}
      >
        Task Manager
      </Title>
      <Subtitle
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Keep track of all your tasks!
      </Subtitle>
    </HeaderContainer>
  );
};

export default DashboardHeader;

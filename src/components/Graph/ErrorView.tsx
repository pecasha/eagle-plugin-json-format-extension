import React from "react";
import styled from "styled-components";

const StyledErrorView = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100vh;

    img {
        filter: drop-shadow(2px 4px 6px black);
    }
`;

const StyledTitle = styled.h2`
  color: ${({ theme }) => theme.TEXT_DANGER};
`;

const StyledInfo = styled.p`
  width: 60%;
  text-align: center;
  color: ${({ theme }) => theme.TEXT_NORMAL};
`;

export const ErrorView = () => (
  <StyledErrorView>
    <img src="./assets/undraw_qa_engineers_dg-5-p.svg" width="200" height="200" alt="oops" />
    <StyledTitle>插件无法显示此文件</StyledTitle>
    <StyledInfo>因为您的文件过大，插件目前还无法处理。我们将继续优化以提供更好更稳定的功能！</StyledInfo>
  </StyledErrorView>
);

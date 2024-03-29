import React from "react";
import styled from "styled-components/native";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  useColorScheme,
} from "react-native";
import { makeImgPath } from "../utils";
import Poster from "./Poster";

const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const BgImg = styled.Image`
  opacity: 0.3;
`;

// const Poster = styled.Image`
//   width: 100px;
//   height: 160px;
//   border-radius: 5px;
// `;
const Title = styled.Text<{ isDark: boolean }>`
  font-size: 16px;
  font-weight: 600;
  color: ${(props) => (props.isDark ? "white" : props.theme.textColor)};
  /* color: ${(props) => (props.isDark ? "white" : "white")}; */
`;
const Wrapper = styled.View`
  flex-direction: row;
  height: 100%;
  width: 90%;
  margin: 0 auto;
  justify-content: space-around;
  align-items: center;
`;
const Column = styled.View`
  width: 60%;
`;
const Overview = styled.Text<{ isDark: boolean }>`
  margin-top: 10px;
  color: ${(props) =>
    props.isDark ? "rgba(255, 255, 255, 0.8)" : "rgba(0, 0, 0, 0.8)"};
`;
const Votes = styled(Overview)`
  font-size: 12px;
`;

interface SlideProps {
  backdropPath: string;
  posterPath: string;
  originalTitle: string;
  voteAverage: number;
  overview: string;
}

const Slide: React.FC<SlideProps> = ({
  backdropPath,
  posterPath,
  originalTitle,
  voteAverage,
  overview,
}) => {
  const isDark = useColorScheme() === "dark";
  return (
    <View style={{ flex: 1 }}>
      <BgImg
        style={StyleSheet.absoluteFill}
        source={{ uri: makeImgPath(backdropPath) }}
      />

      <Wrapper>
        <Poster path={posterPath} />
        {/* <Poster source={{ uri: makeImgPath(posterPath) }} /> */}
        <Column>
          <Title isDark={isDark}>{originalTitle}</Title>
          {voteAverage > 0 ? (
            <Votes isDark={isDark}>⭐️ {voteAverage}/10</Votes>
          ) : null}
          <Overview isDark={isDark}>{overview.slice(0, 100)}...</Overview>
        </Column>
      </Wrapper>
    </View>
  );
};
export default Slide;

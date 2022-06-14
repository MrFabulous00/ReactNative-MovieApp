import { NativeStackScreenProps } from "@react-navigation/native-stack";
import React, { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Dimensions,
  RefreshControl,
  FlatList,
  View,
  Text,
} from "react-native";
import Swiper from "react-native-swiper";
import styled from "styled-components/native";
import HMedia from "../components/HMedia";
import Slide from "../components/Slide";
import VMedia from "../components/VMedia";

const API_KEY = "4acd95e48656a1d6878f7daa8fef6af0";
// https://api.themoviedb.org/3/movie/now_playing?api_key=4acd95e48656a1d6878f7daa8fef6af0&language=en-US&page=1&region=KR

const Container = styled.ScrollView``;
// const View = styled.View`
//   flex: 1;
// `;
const Loader = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`;
// const TrendingScroll = styled.ScrollView`
//   margin-top: 20px;
// `;
const TrendingScroll = styled.FlatList`
  margin-top: 20px;
`;
const ListTitle = styled.Text`
  color: white;
  font-size: 18px;
  font-weight: 600;
  margin-left: 30px;
`;
const ListContainer = styled.View`
  margin-bottom: 40px;
`;
const ComingSoonTitle = styled(ListTitle)`
  margin-bottom: 20px;
`;
const VSeperator = styled.View`
  width: 20px;
`;
const HSeperator = styled.View`
  width: 20px;
`;

const { height: SCREEN_HEIGHT } = Dimensions.get("window");

const Movies: React.FC<NativeStackScreenProps<any, "Movies">> = () => {
  const [loading, setLoading] = useState(true);
  const [nowPlaying, setNowPlaying] = useState([]);
  const [upComing, setUpComing] = useState([]);
  const [trending, setTrending] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getTrending = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/trending/movie/week?api_key=${API_KEY}`
      )
    ).json();
    setTrending(results);
  };
  const getUpcoming = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
      )
    ).json();

    setUpComing(results);
    // setLoading(false);
  };
  const getNowPlaying = async () => {
    const { results } = await (
      await fetch(
        `https://api.themoviedb.org/3/movie/now_playing?api_key=${API_KEY}&language=ko-KR&page=1&region=KR`
      )
    ).json();

    // setNowPlaying(t);
    setNowPlaying(results);
    // setLoading(false);
  };

  const getData = async () => {
    await Promise.all([getTrending(), getUpcoming(), getNowPlaying()]);
    setLoading(false);
  };

  const onRefresh = async () => {
    setRefreshing(true);
    console.log("refreshing");
    await getData();
    setRefreshing(false);
    console.log("done");
  };

  const renderVMedia = ({ item }) => (
    <VMedia
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      voteAverage={item.vote_average}
    />
  );
  const renderHMedia = ({ item }) => (
    <HMedia
      // key={movie.id}
      posterPath={item.poster_path}
      originalTitle={item.original_title}
      overview={item.overview}
      releaseDate={item.release_date}
    />
  );
  const movieKeyExtractor = (item) => item.id + "";

  useEffect(() => {
    // getNowPlaying();
    getData();
  }, []);

  return loading ? (
    <Loader>
      <ActivityIndicator size="large" />
    </Loader>
  ) : (
    <FlatList
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      ListHeaderComponent={
        <>
          <Swiper
            horizontal
            loop
            autoplay
            autoplayTimeout={3.5}
            showsButtons={false}
            showsPagination={false}
            // style={{ marginBottom: 500 }}
            containerStyle={{
              marginBottom: 30,
              width: "100%",
              height: SCREEN_HEIGHT / 4,
            }}
          >
            {nowPlaying.map((movie) => {
              return (
                <Slide
                  key={movie.id}
                  backdropPath={movie.backdrop_path}
                  posterPath={movie.poster_path}
                  originalTitle={movie.original_title}
                  voteAverage={movie.vote_average}
                  overview={movie.overview}
                />
              );
            })}
          </Swiper>
          <ListContainer>
            <ListTitle>Trending Movies</ListTitle>
            <TrendingScroll
              contentContainerStyle={{ paddingHorizontal: 20 }}
              data={trending}
              keyExtractor={movieKeyExtractor}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={VSeperator}
              renderItem={renderVMedia}
            />
            {/* <TrendingScroll
          contentContainerStyle={{ paddingLeft: 30 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {trending.map((movie) => (
            <VMedia
              key={movie.id}
              posterPath={movie.poster_path}
              originalTitle={movie.original_title}
              voteAverage={movie.vote_average}
            />
          ))}
        </TrendingScroll> */}
          </ListContainer>
          <ComingSoonTitle>Coming Soon</ComingSoonTitle>
        </>
      }
      data={upComing}
      keyExtractor={movieKeyExtractor}
      ItemSeparatorComponent={HSeperator}
      renderItem={renderHMedia}
    />
    // <Container
    //   refreshControl={
    //     <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
    //   }
    // >
    //   <Swiper
    //     horizontal
    //     loop
    //     autoplay
    //     autoplayTimeout={3.5}
    //     showsButtons={false}
    //     showsPagination={false}
    //     // style={{ marginBottom: 500 }}
    //     containerStyle={{
    //       marginBottom: 30,
    //       width: "100%",
    //       height: SCREEN_HEIGHT / 4,
    //     }}
    //   >
    //     {nowPlaying.map((movie) => {
    //       return (
    //         <Slide
    //           key={movie.id}
    //           backdropPath={movie.backdrop_path}
    //           posterPath={movie.poster_path}
    //           originalTitle={movie.original_title}
    //           voteAverage={movie.vote_average}
    //           overview={movie.overview}
    //         />
    //       );
    //     })}
    //   </Swiper>
    //   <ListContainer>
    //     <ListTitle>Trending Movies</ListTitle>
    //     <TrendingScroll
    //       contentContainerStyle={{ paddingHorizontal: 20 }}
    //       data={trending}
    //       keyExtractor={(item) => item.id + ""}
    //       horizontal
    //       showsHorizontalScrollIndicator={false}
    //       ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
    //       renderItem={({ item }) => (
    //         <VMedia
    //           // key={movie.id}
    //           posterPath={item.poster_path}
    //           originalTitle={item.original_title}
    //           voteAverage={item.vote_average}
    //         />
    //       )}
    //     />
    //     {/* <TrendingScroll
    //       contentContainerStyle={{ paddingLeft: 30 }}
    //       horizontal
    //       showsHorizontalScrollIndicator={false}
    //     >
    //       {trending.map((movie) => (
    //         <VMedia
    //           key={movie.id}
    //           posterPath={movie.poster_path}
    //           originalTitle={movie.original_title}
    //           voteAverage={movie.vote_average}
    //         />
    //       ))}
    //     </TrendingScroll> */}
    //   </ListContainer>
    //   <ComingSoonTitle>Coming Soon</ComingSoonTitle>
    //   <FlatList
    //     data={upComing}
    //     keyExtractor={(item) => item.id + ""}
    //     ItemSeparatorComponent={() => <View style={{ height: 20 }} />}
    //     renderItem={({ item }) => (
    //       <HMedia
    //         // key={movie.id}

    //         posterPath={item.poster_path}
    //         originalTitle={item.original_title}
    //         overview={item.overview}
    //         releaseDate={item.release_date}
    //       />
    //     )}
    //   />

    //   {/* {upComing.map((movie) => (
    //     <HMedia
    //       key={movie.id}
    //       posterPath={movie.poster_path}
    //       originalTitle={movie.original_title}
    //       overview={movie.overview}
    //       releaseDate={movie.release_date}
    //     />
    //   ))} */}
    // </Container>
  );
};

export default Movies;

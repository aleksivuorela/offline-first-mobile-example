// @flow

import React, { Component } from 'react';
import { FlatList } from 'react-native';
import { type NavigationScreenProp } from 'react-navigation';
import styled from 'styled-components/native';
import { Query } from 'react-apollo';

import CreatePostButton from '../components/CreatePostButton';
import Post from '../components/Post';
import Text from '../components/Text';
import sunSrc from '../assets/sun.gif';
import GET_POSTS from '../graphql/queries/getPosts';

const Sun = styled.Image.attrs({ source: sunSrc })`
  height: 100px;
  width: 100px;
`;

const Feed = styled.View`
  background-color: #eef1f4;
  flex: 1;
`;

const Page = styled.View`
  flex: 1;
  background-color: white;
  padding-top: 30px;
  justify-content: center;
`;

const SunWrapper = styled.View`
  justify-content: center;
  align-items: center;
  height: 120px;
`;

const Center = styled.View`
  height: 100px;
  justify-content: center;
  align-items: center;
`;

type Props = {
  navigation: NavigationScreenProp
};

export default class App extends Component<Props> {
  render() {
    const { navigation } = this.props;

    return (
      <Page>
        <SunWrapper>
          <Sun />
        </SunWrapper>
        <Feed>
          <CreatePostButton onPress={() => navigation.navigate('CreatePostModal')} />
          <Query query={GET_POSTS}>
            {({ data, loading, error }) => {
              if (loading) {
                return (
                  <Center>
                    <Text>Loading...</Text>
                  </Center>
                );
              }

              if (error) {
                return (
                  <Center>
                    <Text>Error</Text>
                  </Center>
                );
              }
              return (
                <FlatList
                  data={data.posts}
                  keyExtractor={item => String(item.id)}
                  renderItem={({ item }) => <Post post={item} />}
                />
              );
            }}
          </Query>
        </Feed>
      </Page>
    );
  }
}
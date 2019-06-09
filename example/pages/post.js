import React from 'react';
import Error from 'next/error';
import Link from '../Link';

const posts = {
  'next-js-post': {
    title: 'This is a Next.js post',
    text:
      "Look, just because I don't be givin' no man a foot massage don't make it right for Marsellus to throw Antwone into a glass motherfuckin' house, fuckin' up the way the nigger talks. Motherfucker do that shit to me, he better paralyze my ass, 'cause I'll kill the motherfucker, know what I'm sayin'?"
  },
  'routex-js-post': {
    title: 'This is a routex.js post',
    text:
      "My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?"
  },
  'dynamic-routes-in-next-js': {
    title: 'Handle dynamic routes in Next.js',
    text:
      "My money's in that office, right? If she start giving me some bullshit about it ain't there, and we got to go someplace else and get it, I'm gonna shoot you in the head then and there. Then I'm gonna shoot that bitch in the kneecaps, find out where my goddamn money is. She gonna tell me too. Hey, look at me when I'm talking to you, motherfucker. You listen: we go in there, and that nigga Winston or anybody else is in there, you the first motherfucker to get shot. You understand?"
  }
};

class Blog extends React.Component {
  static getInitialProps({ query }) {
    const post = posts[query.slug];

    return {
      post,
      query: JSON.stringify(query)
    };
  }

  render() {
    if (!this.props.post) {
      return <Error statusCode="404" />;
    }

    return (
      <div>
        <h1>{this.props.post.title}</h1>
        <p>{this.props.post.text}</p>
        <p>{this.props.query}</p>
        <Link route="index" title="Home page">
          Home page
        </Link>
      </div>
    );
  }
}

export default Blog;

import * as React from 'react';
import PlaylistDetails from '../components/PlaylistDetails';

interface Props {
  match: any
}

const PlaylistDetailsView: React.FC<Props> = (props) => {
  const { match: { params } } = props;

  return (
    <PlaylistDetails playlistId={params.playlistId} />
  );
};
  
export default PlaylistDetailsView;
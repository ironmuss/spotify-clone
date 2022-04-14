import {
  HomeIcon,
  SearchIcon,
  LibraryIcon,
  PlusCircleIcon,
  HeartIcon,
  RssIcon,
} from "@heroicons/react/outline";
import { signOut, useSession } from "next-auth/react";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
import { playlistIdState } from "../atoms/playlistAtoms";
import useSpotify from "../hooks/useSpotify";

function Sidebar() {
  const spotifyAPI = useSpotify();
  const { data: session, status } = useSession();
  const [playlists, setPlaylists] = useState([]);
  const [playlistId, setPlaylistsId] = useRecoilState(playlistIdState);
  console.log(`You picked playlist >>>`, playlistId);

  useEffect(() => {
    if (spotifyAPI.getAccessToken()) {
      spotifyAPI.getUserPlaylists().then((data) => {
        setPlaylists(data.body.items);
      });
    }
  }, [session, spotifyAPI]);

  return (
    <div className="border-grey-900 text-xs lg:text-sm sm:max-w-[12rem] lg:max-w-[15rem] hidden md:inline-flex border-r p-5  text-gray-500 overflow-y-scroll scrollbar-hide h-sreen pb-36">
      <div className="space-y-4">
        <button className="flex items-center space-x-2 hover:text-white">
          <HomeIcon className="h-5 w-5" />
          <p>Home</p>
        </button>
        <button className="flex items-center  space-x-2 hover:text-white">
          <SearchIcon className="h-5 w-5" />
          <p>Search</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <LibraryIcon className="h-5 w-5" />
          <p>Your Library</p>
        </button>
        <hr className="border-grey-900 border-t-[0.1px]" />

        <button className="flex items-center space-x-2 hover:text-white">
          <PlusCircleIcon className="h-5 w-5" />
          <p>Create Playlist</p>
        </button>
        <button className="flex items-center space-x-2 hover:text-white">
          <HeartIcon className="h-5 w-5 text-blue-500" />
          <p>Liked Songs</p>
        </button>
        <button className="flex items-center  space-x-2 hover:text-white">
          <RssIcon className="h-5 w-5 text-green-500" />
          <p>Your Episodes</p>
        </button>
        <hr className="border-grey-900 border-t-[0.1px]" />
        {/* Playlists... */}
        {playlists.map((playlist) => (
          <p
            key={playlist.id}
            onClick={() => setPlaylistsId(playlist.id)}
            className="cursor-pointer hover:text-white"
          >
            {playlist.name}
          </p>
        ))}
      </div>
    </div>
  );
}
export default Sidebar;

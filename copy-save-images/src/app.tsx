import Item = Spicetify.ContextMenu.Item;
import URI = Spicetify.URI;

async function main() {
  while (!Spicetify?.showNotification) {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  const contextCopyImageItem = new Item("Copy Image Link", async ([uriStr]) => {
    const uri = URI.fromString(uriStr);
    const id = uri.id;

    if (!uri)
      return;
    switch (uri.type) {
      case URI.Type.ARTIST:
      case URI.Type.ALBUM:
        const albumOrArtist = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/${uri.type === URI.Type.ALBUM ? 'albums' : 'artists'}/${id}`);
        sendToClipboard(albumOrArtist.name, albumOrArtist.images[0].url)
        break;
      case URI.Type.TRACK:
        const track = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/tracks/${id}`);
        sendToClipboard(track.album.name, track.album.images[0].url)
    }
  }, ([uriStr]) => {
    const uri = URI.fromString(uriStr);
    //console.log(uri);
    //console.log("API Image Linker: isAlbum=" + URI.isAlbum(uri) + ", isArtist=" + URI.isArtist(uri) + ", isTrack=" + URI.isTrack(uri))
    return uri.type === 'artist' || uri.type === 'track' || uri.type === 'album';
  }, 'copy');

  const contextCopyBannerItem = new Item("Copy Banner Link", async ([uriStr]) => {
    const id = URI.fromString(uriStr)?.id;
    if (!id)
      return
    //console.log(`Banner Retriever - Artist API link: https://api.spotify.com/v1/artist/${id}`);
    const artist = await Spicetify.CosmosAsync.get(`https://api.spotify.com/v1/artists/${id}`);
    const bannerElem = document.querySelector('.under-main-view .main-entityHeader-background.main-entityHeader-gradient') as HTMLElement;
    if (bannerElem !== null) {
      sendToClipboard(artist.name, bannerElem.style.backgroundImage.substring("url(\"".length, bannerElem.style.backgroundImage.length-2))
    }
    else
      Spicetify.showNotification("「" + artist.name + "」 banner not found!")
  }, ([uriStr]) => {
    const uri = URI.fromString(uriStr);
    if (uri.type !== 'artist') {
      //console.log("Banner Retriever: not an artist link!")
      return false;
    }
    const artistSection = document.querySelector('.main-view-container__scroll-node-child section');
    //console.log("Banner Retriever - Artist Section: " + artistSection)
    if (artistSection !== null) {
      const dataTestUri = artistSection.getAttribute("data-test-uri");
      const id = uri.id;
      //console.log("Banner Retriever - dataTestUri: " + dataTestUri)
      return dataTestUri !== null && id === dataTestUri.substring("spotify:artist:".length);
    }
    return false;
  }, 'instagram');

  contextCopyImageItem.register();
  contextCopyBannerItem.register();
}

function sendToClipboard(name: string, imageUrl: string) {
  if (imageUrl) {
    Spicetify.showNotification("Copied: 「" + name + "」 image!")
    Spicetify.Platform.ClipboardAPI.copy(imageUrl)
  }
}

export default main;

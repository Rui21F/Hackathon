import "./modal.css";
import artists from "./artists";

export function handleModal(stateName) {
  const $modal = $("#stateModal");
  const $modalTitle = $("#modal-state-name");
  const $modalStateInfo = $("#modal-state-info");

  $modal.css("display", "block");

  const artistForState = artists.find((artist) => artist.State === stateName);

  if (
    artistForState ||
    artistForState.Name !== "No widely recognized soul artist"
  ) {
    $modalTitle.text(artistForState.Name);
    $modalStateInfo.html(`
      <div class="modal-body">
        <img class="modal-image" src="${
          artistForState.Image
        }" alt="Artist image from ${artistForState.State}">
        <div class="modal-info">
          <p> ${artistForState.Age ? artistForState.Age : "Not available"}</p>
          <p><strong>Greatest Hit:</strong> ${
            artistForState.GreatestHit
              ? artistForState.GreatestHit
              : "Not available"
          }</p>
          <p><strong>Net Worth:</strong> ${
            artistForState.NetWorth
              ? `$${artistForState.NetWorth}M`
              : "Not available"
          }</p>
          <p><strong>Fact:</strong> ${
            artistForState.Fact 
              ? artistForState.Fact 
              : "Not available"
          }</p>
          <button id="playMusicButton">Play Music</button>
        </div>
      </div>
    `);
  } else {
    $modalTitle.text(stateName);
    $modalStateInfo.text(`No artist information found for ${stateName}.`);
  }

  $(".close").on("click", () => {
    $modal.css("display", "none");
  });

  $modal.on("click", (event) => {
    if (event.target === $modal[0]) {
      $modal.css("display", "none");
    }
  });


  
  $(document).ready(function() {
    const audio = new Audio(artistForState.Music);
    let isPlaying = false;
    $("#playMusicButton").on("click", function() {
      if (isPlaying) {
        audio.pause();
        isPlaying = false;
      } else {
        audio.play();
        isPlaying = true;
      }
    });
  });

}



import { BASE_URL } from "./constants";

/**
 * Dict holding cached values of API request to _config endpoint
 */
let configDict = {};

function setLabels() {
  const provider = $("#provider_prefix").val();
  const text = configDict[provider]["text"];
  const tagText = configDict[provider]["tag_text"];
  const refPropDisabled = configDict[provider]["ref_prop_disabled"];
  const labelPropDisabled = configDict[provider]["label_prop_disabled"];
  const placeholder = "HEAD";

  $("#ref").attr("placeholder", placeholder).prop("disabled", refPropDisabled);
  $("label[for=ref]").text(tagText).prop("disabled", labelPropDisabled);
  $("#repository").attr("placeholder", text);
  $("label[for=repository]").text(text);
}

/**
 * Update labels for various inputboxes based on user selection of repo provider
 */
export function updateRepoText() {
  if (Object.keys(configDict).length === 0) {
    const configUrl = new URL("_config", BASE_URL);
    fetch(configUrl).then((resp) => {
      resp.json().then((data) => {
        configDict = data;
        setLabels();
      });
    });
  } else {
    setLabels();
  }
}

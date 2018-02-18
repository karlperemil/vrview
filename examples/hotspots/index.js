/*
 * Copyright 2016 Google Inc. All Rights Reserved.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var vrView;

// All the scenes for the experience
var scenes = {
  main: {
    video: '../video/Film1-WasteProblem_PlaceHolder_VimeoSettings.mp4',
    preview: 'dolphins-preview.jpg',
    loop: true,
    muted: true,
    cornermap: false,
    next: function(){
      $('#intro').show();
    },
    hotspots: {
      mranzai: {
        pitch: 0,
        yaw: 0,
        radius: 0.09,
        distance: 1,
        copy: "Mr. Anzai"
      },
      humanrights: {
        pitch: 0,
        yaw: 90,
        radius: 0.09,
        distance: 1,
        copy: "TThe Human Rights Issue"
      },
      radiation: {
        pitch: 0,
        yaw: 180,
        radius: 0.09,
        distance: 1,
        copy: "Radiation Scanning"
      },
      mrskanno : {
        pitch: 0,
        yaw: 270,
        radius: 0.09,
        distance: 1,
        copy: "Mrs. Kanno"
      }
    }
  },
  mranzai: {
    video: '../video/Film5-MrAnzai_VimeoSettings.mp4',
    preview: 'dolphins-preview.jpg',
    loop: false,
    cornermap: true,
    next: function(){
      $('#intro').hide();
    },
    hotspots: {
      mranzai: {
        pitch: 0,
        yaw: 0,
        radius: 0.09,
        distance: 1,
        copy: "Mr. Anzai"
      },
      humanrights: {
        pitch: 0,
        yaw: 90,
        radius: 0.09,
        distance: 1,
        copy: "TThe Human Rights Issue"
      },
      radiation: {
        pitch: 0,
        yaw: 180,
        radius: 0.09,
        distance: 1,
        copy: "Radiation Scanning"
      },
      mrskanno : {
        pitch: 0,
        yaw: 270,
        radius: 0.09,
        distance: 1,
        copy: "Mrs. Kanno"
      }
    }
  },
  humanrights: {
    video: '../video/Film2-HumanRightsIssue_VimeoSettings.mp4',
    preview: 'whale-left-preview.jpg',
    loop: false,
    cornermap: true,
    next: function(){
      $('#intro').hide();
    },
    hotspots: {
      mranzai: {
        pitch: 0,
        yaw: 0,
        radius: 0.09,
        distance: 1,
        copy: "Mr. Anzai"
      },
      humanrights: {
        pitch: 0,
        yaw: 90,
        radius: 0.09,
        distance: 1,
        copy: "TThe Human Rights Issue"
      },
      radiation: {
        pitch: 0,
        yaw: 180,
        radius: 0.09,
        distance: 1,
        copy: "Radiation Scanning"
      },
      mrskanno : {
        pitch: 0,
        yaw: 270,
        radius: 0.09,
        distance: 1,
        copy: "Mrs. Kanno"
      }
    }
  },
  radiation: {
    video: '../video/Film3-RadiationScanning_VimeoSettings.mp4',
    preview: 'whale-right-preview.jpg',
    loop: false,
    cornermap: true,
    next: function(){
      $('#intro').hide();
    },
    hotspots: {
      mranzai: {
        pitch: 0,
        yaw: 0,
        radius: 0.09,
        distance: 1,
        copy: "Mr. Anzai"
      },
      humanrights: {
        pitch: 0,
        yaw: 90,
        radius: 0.09,
        distance: 1,
        copy: "TThe Human Rights Issue"
      },
      radiation: {
        pitch: 0,
        yaw: 180,
        radius: 0.09,
        distance: 1,
        copy: "Radiation Scanning"
      },
      mrskanno : {
        pitch: 0,
        yaw: 270,
        radius: 0.09,
        distance: 1,
        copy: "Mrs. Kanno"
      }
    }
  },
  mrskanno: {
    video: '../video/Film4-MrsKanno_VimeoSettings.mp4',
    preview: 'walrus-preview.jpg',
    loop: false,
    cornermap: true,
    next: function(){
      $('#intro').hide();
    },
    hotspots: {
      mranzai: {
        pitch: 0,
        yaw: 0,
        radius: 0.09,
        distance: 1,
        copy: "Mr. Anzai"
      },
      humanrights: {
        pitch: 0,
        yaw: 90,
        radius: 0.09,
        distance: 1,
        copy: "TThe Human Rights Issue"
      },
      radiation: {
        pitch: 0,
        yaw: 180,
        radius: 0.09,
        distance: 1,
        copy: "Radiation Scanning"
      },
      mrskanno : {
        pitch: 0,
        yaw: 270,
        radius: 0.09,
        distance: 1,
        copy: "Mrs. Kanno"
      }
    }
  }
};

function onLoad() {
  vrView = new VRView.Player('#vrview', {
    image: 'blank.png',
    preview: 'blank.png',
    is_stereo: false,
    loop: true,
    is_autopan_off: true,
    muted: true
  });

  vrView.on('ready', onVRViewReady);
  vrView.on('modechange', onModeChange);
  vrView.on('click', onHotspotClick);
  vrView.on('error', onVRViewError);
  vrView.on('getposition', onGetPosition);
}

function onVRViewReady(e) {
  console.log('onVRViewReady');
  loadScene('main');
  listeners();
}

function listeners(){
  $('#intro-hide').click(function(){
    $('#intro').hide();
  });
  $('#corner-map').click(function(){
    loadScene('main');
  })
}

function onModeChange(e) {
  console.log('onModeChange', e.mode);
}

function onGetPosition(e) {
  console.log(e);

}

function onHotspotClick(e) {
  vrView.getPosition()
  console.log('onHotspotClick', e.id);
  if (e.id) {
    loadScene(e.id);
  }
}

function loadScene(id) {
  console.log('loadScene', id);

  // Set the image
  vrView.setContent({
    video: scenes[id].video,
    preview: scenes[id].preview,
    is_stereo: false,
    is_autopan_off: true,
    loop: scenes[id].loop,
    muted: scenes[id].muted
  });

  if(scenes[id].cornermap === true){
    $('#corner-map-img').show();
  }
  else {
    $('#corner-map-img').hide();
  }

  // Add all the hotspots for the scene
  var newScene = scenes[id];
  var sceneHotspots = Object.keys(newScene.hotspots);
  for (var i = 0; i < sceneHotspots.length; i++) {
    var hotspotKey = sceneHotspots[i];
    var hotspot = newScene.hotspots[hotspotKey];

    vrView.addHotspot(hotspotKey, {
      pitch: hotspot.pitch,
      yaw: hotspot.yaw,
      radius: hotspot.radius,
      distance: hotspot.distance
    });
  }

  scenes[id].next();
}

function onVRViewError(e) {
  console.log('Error! %s', e.message);
}

window.addEventListener('load', onLoad);

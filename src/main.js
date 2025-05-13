import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { makeMap, width, margin } from './makeMap.js'
import { makeLegend } from './makeLegend.js';
import 'leaflet/dist/leaflet.css';

document.querySelector('#app').innerHTML = `
  <div class='main-grid' style="grid-template-columns: 1fr ${width + (margin.l + margin.r)}px 1fr;">
    <div></div>
    <div>
    <div id="title">
    <div id="mainTitle">
    Sacramento’s Divided Democratic Ideology: Leftist Urban Core vs. Suburban Centrism.
    </div>
    <div class="subTitle">
    The Democratic Primary was held on June 7th, 2016. The race, both nationally and locally, was primarily between two candidates: Hillary Clinton and Bernie Sanders.
    </div>

    <div class="subTitle">
    Bernie Sanders ran on a platform that was openly socialist and left (as Bernie Sanders is a self-proclaimed democratic socialis). Sanders garnered most of his support from young voters through campaign promises such as nationalized health care and free higher education.
    </div>

    <div class="subTitle">
    Hillary Clinton ran as a moderate liberal—someone who had experience and could work within the system to create change. She also promised to continue a proactive international policy. Hillary Clinton received support primarily from baby boomers, older and more established Democrats, and African Americans.
    <div class="subTitle">
    By understanding the base of support for each candidate, we can learn a lot about our community through this interactive map. It shows that Bernie performed best in Midtown Sacramento, where many young Democrats live, the rent is affordable, and there are plenty of bars. This map highlights that Midtown attracts younger, more liberal residents. Hillary performed best in The Pocket, East Sacramento, and South Sacramento. The Pocket and East Sacramento are similar communities, filled with upper-middle-class homes occupied by educated baby boomers. South Sacramento, by contrast, is populated by more lower-middle-class housing and has a higher concentration of minority residents.
    </div>
    
    <div id="authorTitle">
      By: <a id="me" href="https://bsky.app/profile/truesync.bsky.social">Nathan Harris</a>     <a href="https://bsky.app/profile/truesync.bsky.social">@truesync.bsky.social</a> <a href="http://nathanharris.co">nathanharris.co</a> 
    </div>

    </div>
    <div id ="legend"> </div>
    <div id="mapid"></div> 
      
    <div id="links">
    <div class="flex-this-links" >
    <a class="sm-link" href ="https://bsky.app/intent/compose?text=Patrick%20Mahomes%20and%20the%20KC%20Chiefs%20dug%20themselves%20a%20Historic%20half%20time%20deficit%20the%202nd%20worse%20ever.%20Explore%20Super%20Bowl%20comebacks%20and%20more%20in%20this%20Visualization%20http%3A%2F%2F https://nharrisanalyst.github.io/superbowlhalf/" class='sm-link'>
      <svg class="w-6 h-6 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 568 501"><title>Bluesky butterfly logo</title><path fill="currentColor" d="M123.121 33.664C188.241 82.553 258.281 181.68 284 234.873c25.719-53.192 95.759-152.32 160.879-201.21C491.866-1.611 568-28.906 568 57.947c0 17.346-9.945 145.713-15.778 166.555-20.275 72.453-94.155 90.933-159.875 79.748C507.222 323.8 536.444 388.56 473.333 453.32c-119.86 122.992-172.272-30.859-185.702-70.281-2.462-7.227-3.614-10.608-3.631-7.733-.017-2.875-1.169.506-3.631 7.733-13.43 39.422-65.842 193.273-185.702 70.281-63.111-64.76-33.89-129.52 80.986-149.071-65.72 11.185-139.6-7.295-159.875-79.748C9.945 203.659 0 75.291 0 57.946 0-28.906 76.135-1.612 123.121 33.664Z"></path></svg>
    </a>
    <div id="tweet-this">
    <a href="https://twitter.com/intent/tweet?hashtags=NFL&text=Explore Super Bowl Halftime Deficits&url=https://nharrisanalyst.github.io/superbowlhalf/" class="twitter-share-button" data-show-count="false">Tweet</a><script async src="https://platform.twitter.com/widgets.js" charset="utf-8"></script>
    </div>
    <div id="reddit-this">
      <a href="https://reddit.com/submit?url=https%3A%2F%2Fnharrisanalyst.github.io%2Fsuperbowlhalf%2F&title=Patrick Mahomes and The Kansas City Chiefs Dug Themselves a Historic Unsurmountable Half Time Deficit." onclick="window.open(this.href, '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;" title="Share on Reddit" rel="noopener" >Share on Reddit</a>
    </div>
    </div>
    <div id="newsletter">
       <div id="newsletter-title"> subscribe to my Data Visualization newsletter &nbsp; &nbsp; </div>
      <iframe src="https://embeds.beehiiv.com/da2f7bb3-4c1d-43cd-bb63-8094b70fa63f?slim=true" data-test-id="beehiiv-embed" height="52" frameborder="0" scrolling="no" style="margin: 0; border-radius: 0px !important; background-color: transparent;"></iframe>
      </div>
    </div>
    </div>
    <div></div>
  </div>
`
makeLegend(document.querySelector('#legend'))
makeMap(document.querySelector('#mapid'))
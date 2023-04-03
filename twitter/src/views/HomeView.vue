<script setup>
  import { twitterStore } from "../stores/twitter.js"
  import Tweet from "../components/Tweet.vue"
  import NewTweet from "../components/NewTweet.vue"
  const twitter = twitterStore()




</script>

<template>


 <div>
    <button class="nouveauTweet" v-if="twitter.nbTweetsToLoad != 0" @click="twitter.refresh">  ↑ {{ twitter.nbTweetsToLoad}} nouveaux tweets !</button>
  </div>

  <div id="newTweet"><a href="#demo"><span class="material-symbols-outlined">
draw
</span></a></div>

<div id="demo" class="modal">
<div class="modal_content">
  <a href="#" class="modal_close">X</a>
   <NewTweet/>
</div>
</div>

    <div class="layout">
      <div class="layout__left-sidebar">
        <img src="../svg/twitter.svg" class="brand" />
        <div class="sidebar-menu">
          <div class="sidebar-menu__item sidebar-menu__item--active">
            <img src="../svg/home.svg" class="sidebar-menu__item-icon" />
            Home
          </div>
          <div class="sidebar-menu__item">
            <img src="../svg/explore.svg" class="sidebar-menu__item-icon" />
            Explore
          </div>

          <div class="sidebar-menu__item">
            <img
              src="../svg/notifications.svg"
              class="sidebar-menu__item-icon"
            />
            Notifications
          </div>

          <div class="sidebar-menu__item">
            <img src="../svg/messages.svg" class="sidebar-menu__item-icon" />
            Messages
          </div>

          <div class="sidebar-menu__item">
            <img src="../svg/profile.svg" class="sidebar-menu__item-icon" />
            Profile
          </div>

          <div class="sidebar-menu__item">
            <img src="../svg/more.svg" class="sidebar-menu__item-icon" />
            More
          </div>
        </div>
      </div>
      <div class="layout__main">

      <Tweet v-for="tweet in twitter.tweets" :tweet="tweet">
  
      </Tweet>


      </div>




      <div class="layout__right-sidebar-container">
        <div class="layout__right-sidebar">
          <div class="trends-for-you">
            <div class="trends-for-you__block">
              <div class="trends-for-you__heading">
                Trends for you
              </div>
            </div>
            <div class="trends-for-you__block">
              <div class="trends-for-you__meta-information">
                Trending in Germany
              </div>
              <div class="trends-for-you__trend-name">
                #iPhone12
              </div>
              <div class="trends-for-you__meta-information">
                155k Tweets
              </div>
            </div>
            <div class="trends-for-you__block">
              <div class="trends-for-you__meta-information">
                Trending in Germany
              </div>
              <div class="trends-for-you__trend-name">
                #AmazonPrimeDay
              </div>
            </div>
            <div class="trends-for-you__block">
              <div class="trends-for-you__meta-information">
                Trending - Trending
              </div>
              <div class="trends-for-you__trend-name">
                #autos
              </div>
              <div class="trends-for-you__meta-information">
                2,800 Tweets
              </div>
            </div>
          </div>
          <div class="who-to-follow">
            <div class="who-to-follow__block">
              <div class="who-to-follow__heading">
                Who to follow
              </div>
            </div>
            <div class="who-to-follow__block">
              <img
                class="who-to-follow__author-logo"
                src="./images/profile-image-1.jpg"
              />
              <div class="who-to-follow__content">
                <div>
                  <div class="who-to-follow__author-name">
                    Becki (& Chris)
                  </div>
                  <div class="who-to-follow__author-slug">
                    @beckiandchris
                  </div>
                </div>
                <div class="who-to-follow__button">
                  Follow
                </div>
              </div>
            </div>
            <div class="who-to-follow__block">
              <img
                class="who-to-follow__author-logo"
                src="./images/profile-image-2.png"
              />
              <div class="who-to-follow__content">
                <div>
                  <div class="who-to-follow__author-name">
                    Elixir Digest
                  </div>
                  <div class="who-to-follow__author-slug">
                    @elixirdigest
                  </div>
                </div>
                <div class="who-to-follow__button">
                  Follow
                </div>
              </div>
            </div>

            <div class="who-to-follow__block">
              <img
                class="who-to-follow__author-logo"
                src="./images/profile-image-3.jpg"
              />
              <div class="who-to-follow__content">
                <div>
                  <div class="who-to-follow__author-name">
                    Chris Martin
                  </div>
                  <div class="who-to-follow__author-slug">
                    @chris_martin
                  </div>
                </div>
                <div class="who-to-follow__button">
                  Follow
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>









</template>

<style scoped>



  #newTweet{
    position:fixed;
    background-color: #00acee;
    border:0;
    border-radius:20px;
    margin:1vh;
    padding:1vh;
    color:white;


  }
    button{
    position:fixed;
    background-color: #00acee;
    border:0;
    border-radius:20px;
    margin:1vh;
    padding:1vh;
    color:white;

  }
.modal{
  visibility:hidden;
  opacity:0;
  position:fixed;
  top:0;
  bottom:0;
  left:0;
  right:0;
  z-index:5;
  background: rgba(77,77,77,.7);
  justify-content:center;
  align-items:center;

}
.modal:target{
    visibility:visible;
    opacity:1;
}
.modal_content{
  position:fixed;
  background-color:white;
  border:2px solid black;
  border-radius:20px;
  z-index:6;
  display:flex;
}

.modal_close{
  left:10px;
  top:10px;
  position:fixed;
  color:gray;
  text-decoration:none;
}

    button:hover{
    transform:scale(0.95);
  cursor:pointer;
  }
  #newTweet{
    position:fixed;
    bottom:0;
    right:0;    
    margin:2vh;
    padding:1.5vh;
    border-radius:100px;
    display: flex;
    align-items: center;
    justify-content: center;
  }


</style>
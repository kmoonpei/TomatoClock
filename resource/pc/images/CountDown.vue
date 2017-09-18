<template>
  <div class="countdown">
    <div id="clock">
      <div class="digits">
        <div class="one">
          <span class="d1"></span><span class="d2"></span><span class="d3"></span><span class="d4"></span><span class="d5"></span><span class="d6"></span><span class="d7"></span>
        </div>
      </div>
      
    </div>
    <div class="count">
      <div>{{ m }}</div>
      <div>:</div>
      <div>{{ s }}</div> 
    </div>
    <div class="start-resrt">
      <img v-if="ifstart"
           @click="togglePause"
           src="../images/start.png">
      <img v-else 
           @click="toggleStart"
           src="../images/pause.png">
      <img @click="reset"
           src="../images/reset.png">
    </div>
  </div>
</template>

<script>
  let count
  let testminu = 0, testSeco = 6
  export default {
    name: 'countdown',
    data () {
      return {
        start: false,
        minutes: testminu,
        seconeds: testSeco,
      }
    },
    methods: {
      reset () {
        clearInterval(count)
        this.minutes = testminu
        this.seconeds = testSeco
        this.start = false
      },
      togglePause () {
        this.start = !this.start
        clearInterval(count)
      },
      toggleStart () {
        this.start = !this.start
        count =  setInterval( this.seconed, 1000)
      },
      seconed () {
        let seconed = this.minutes * 60 + this.seconeds
        seconed--
        this.minutes = parseInt(seconed / 60)
        this.seconeds = seconed % 60
      },
      add0 (item) {
        if(item == 0){
          return '00'
        } else if (item < 10) {
          return '0' + item
        }else {
          return item
        }
      }
    },
    computed: {
      ifstart () {
        if(this.minutes === 0 && this.seconeds === 0) {
          this.start = !this.start
          clearInterval(count)
          this.$store.commit('openBreakCount',true)
          this.$store.commit('countTomatoNum', 1)
          this.minutes = testminu
          this.seconeds = testSeco
        }
        return this.start
      },
      s () {
        return this.add0(this.seconeds)
      },
      m () {
        return this.add0(this.minutes)
      }
    }
  }
</script>

<style lang="scss" scoped>
  @import "../sass/vars.scss";
  @import "../sass/mixin.scss";

  * {
    @include clearAllPaddMarg;
  }

  ul {
    @include clearListStyle;
  }

  .countdown {
    width: 600px;
    height: 500px;
    position: absolute;
    left: 50%;
    margin-left: -300px;
    // background: url('../images/fanqie2.jpg') -30px -70px no-repeat;
    background-color: $primary-color-light;

    &>.count {
      font-size: 60px;
      font-weight: 600;
      color: $primary-color-dark;
      text-align: center;
      margin-top: 150px;

      &>div {
        display: inline;
        width: 40px;
        height: 40px;
      }
    }
    &>.start-resrt {
      text-align: center;
      width: 100%;
      line-height: 100px;

      &> img {
        width: 40px;
        height: 40px;
        margin: 20px;
        cursor: pointer;
      }
    }
  }



</style>

<style>

#clock.light{
	background-color:#f3f3f3;
	color:#272e38;
}

#clock.light:after{
	box-shadow:0 4px 10px rgba(0,0,0,0.15);
}

#clock.light .digits div span{
	background-color:#272e38;
	border-color:#272e38;	
}

#clock.light .digits div.dots:before,
#clock.light .digits div.dots:after{
	background-color:#272e38;
}

#clock.light .display{
	background-color:#dddddd;
	box-shadow:0 1px 1px rgba(0,0,0,0.08) inset, 0 1px 1px #fafafa;
}
/*-------------------------
	The Digits
--------------------------*/


#clock .digits div{
	text-align:left;
	position:relative;
	width: 28px;
	height:50px;
	display:inline-block;
	margin:0 4px;
}

#clock .digits div span{
	opacity:0;
	position:absolute;

	-webkit-transition:0.25s;
	-moz-transition:0.25s;
	transition:0.25s;
}

#clock .digits div span:before,
#clock .digits div span:after{
	content:'';
	position:absolute;
	width:0;
	height:0;
	border:5px solid transparent;
}

#clock .digits .d1{			height:5px;width:16px;top:0;left:6px;}
#clock .digits .d1:before{	border-width:0 5px 5px 0;border-right-color:inherit;left:-5px;}
#clock .digits .d1:after{	border-width:0 0 5px 5px;border-left-color:inherit;right:-5px;}

#clock .digits .d2{			height:5px;width:16px;top:24px;left:6px;}
#clock .digits .d2:before{	border-width:3px 4px 2px;border-right-color:inherit;left:-8px;}
#clock .digits .d2:after{	border-width:3px 4px 2px;border-left-color:inherit;right:-8px;}

#clock .digits .d3{			height:5px;width:16px;top:48px;left:6px;}
#clock .digits .d3:before{	border-width:5px 5px 0 0;border-right-color:inherit;left:-5px;}
#clock .digits .d3:after{	border-width:5px 0 0 5px;border-left-color:inherit;right:-5px;}

#clock .digits .d4{			width:5px;height:14px;top:7px;left:0;}
#clock .digits .d4:before{	border-width:0 5px 5px 0;border-bottom-color:inherit;top:-5px;}
#clock .digits .d4:after{	border-width:0 0 5px 5px;border-left-color:inherit;bottom:-5px;}

#clock .digits .d5{			width:5px;height:14px;top:7px;right:0;}
#clock .digits .d5:before{	border-width:0 0 5px 5px;border-bottom-color:inherit;top:-5px;}
#clock .digits .d5:after{	border-width:5px 0 0 5px;border-top-color:inherit;bottom:-5px;}

#clock .digits .d6{			width:5px;height:14px;top:32px;left:0;}
#clock .digits .d6:before{	border-width:0 5px 5px 0;border-bottom-color:inherit;top:-5px;}
#clock .digits .d6:after{	border-width:0 0 5px 5px;border-left-color:inherit;bottom:-5px;}

#clock .digits .d7{			width:5px;height:14px;top:32px;right:0;}
#clock .digits .d7:before{	border-width:0 0 5px 5px;border-bottom-color:inherit;top:-5px;}
#clock .digits .d7:after{	border-width:5px 0 0 5px;border-top-color:inherit;bottom:-5px;}


/* 1 */

#clock .digits div.one .d5,
#clock .digits div.one .d7{
	opacity:1;
}

/* 2 */

#clock .digits div.two .d1,
#clock .digits div.two .d5,
#clock .digits div.two .d2,
#clock .digits div.two .d6,
#clock .digits div.two .d3{
	opacity:1;
}

/* 3 */

#clock .digits div.three .d1,
#clock .digits div.three .d5,
#clock .digits div.three .d2,
#clock .digits div.three .d7,
#clock .digits div.three .d3{
	opacity:1;
}

/* 4 */

#clock .digits div.four .d5,
#clock .digits div.four .d2,
#clock .digits div.four .d4,
#clock .digits div.four .d7{
	opacity:1;
}

/* 5 */

#clock .digits div.five .d1,
#clock .digits div.five .d2,
#clock .digits div.five .d4,
#clock .digits div.five .d3,
#clock .digits div.five .d7{
	opacity:1;
}

/* 6 */

#clock .digits div.six .d1,
#clock .digits div.six .d2,
#clock .digits div.six .d4,
#clock .digits div.six .d3,
#clock .digits div.six .d6,
#clock .digits div.six .d7{
	opacity:1;
}


/* 7 */

#clock .digits div.seven .d1,
#clock .digits div.seven .d5,
#clock .digits div.seven .d7{
	opacity:1;
}

/* 8 */

#clock .digits div.eight .d1,
#clock .digits div.eight .d2,
#clock .digits div.eight .d3,
#clock .digits div.eight .d4,
#clock .digits div.eight .d5,
#clock .digits div.eight .d6,
#clock .digits div.eight .d7{
	opacity:1;
}

/* 9 */

#clock .digits div.nine .d1,
#clock .digits div.nine .d2,
#clock .digits div.nine .d3,
#clock .digits div.nine .d4,
#clock .digits div.nine .d5,
#clock .digits div.nine .d7{
	opacity:1;
}

/* 0 */

#clock .digits div.zero .d1,
#clock .digits div.zero .d3,
#clock .digits div.zero .d4,
#clock .digits div.zero .d5,
#clock .digits div.zero .d6,
#clock .digits div.zero .d7{
	opacity:1;
}


/* The dots */

#clock .digits div.dots{
	width:5px;
}

#clock .digits div.dots:before,
#clock .digits div.dots:after{
	width:5px;
	height:5px;
	content:'';
	position:absolute;
	left:0;
	top:14px;
}

#clock .digits div.dots:after{
	top:34px;
}


</style>

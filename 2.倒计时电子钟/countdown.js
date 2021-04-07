// 常量
const WINDOW_WIDTH = 1024;
const WINDOW_HEIGHT = 768;
const RADIUS = 8;
const MARGIN_TOP = 60;
const MARGIN_LEFT = 30;

const endTime = new Date(2021,3,7,0,0,0);
let curShowTimeSeconds = 0

window.onload = function(){
		// 初始化画布
    const canvas = document.getElementById('canvas');
    const context = canvas.getContext("2d");

    canvas.width = WINDOW_WIDTH;
    canvas.height = WINDOW_HEIGHT;
		curShowTimeSeconds = getCurrentShowTimeSeconds()
		render( context )
}

function getCurrentShowTimeSeconds() {
	let curTime = new Date();
	let ret = endTime.getTime() - curTime.getTime();
	console.log(ret)
	ret = Math.round( ret/1000 )

	return ret >= 0 ? ret : 0;
}

// 绘制数字的每一个圆点
function render( cxt ){
	// let hours = 12
	// let minutes = 34
	// let seconds = 56

	let hours = parseInt( curShowTimeSeconds / 3600);
	let minutes = parseInt( (curShowTimeSeconds - hours * 3600)/60 )
	let seconds = curShowTimeSeconds % 60

	// 1
	renderDigit( MARGIN_LEFT , MARGIN_TOP , parseInt(hours/10) , cxt )
	// 2
	renderDigit( MARGIN_LEFT + 15*(RADIUS+1) , MARGIN_TOP , parseInt(hours%10) , cxt )
	// ：
	renderDigit( MARGIN_LEFT + 30*(RADIUS + 1) , MARGIN_TOP , 10 , cxt )
	// 3
	renderDigit( MARGIN_LEFT + 39*(RADIUS+1) , MARGIN_TOP , parseInt(minutes/10) , cxt);
	// 4
	renderDigit( MARGIN_LEFT + 54*(RADIUS+1) , MARGIN_TOP , parseInt(minutes%10) , cxt);
	// ：
	renderDigit( MARGIN_LEFT + 69*(RADIUS+1) , MARGIN_TOP , 10 , cxt);
	// 5
	renderDigit( MARGIN_LEFT + 78*(RADIUS+1) , MARGIN_TOP , parseInt(seconds/10) , cxt);
	// 6
	renderDigit( MARGIN_LEFT + 93*(RADIUS+1) , MARGIN_TOP , parseInt(seconds%10) , cxt);
}

// 绘制圆点
function renderDigit( x , y , num , cxt ){
    cxt.fillStyle = "rgb(0,102,153)";

    for(let i = 0 ; i < digit[num].length ; i ++ )
        for(let j = 0 ; j < digit[num][i].length ; j ++ )
            if( digit[num][i][j] == 1 ){
                cxt.beginPath();
		            // 第（i, j）个圆的圆心位置：
		            // j*2*(R+1) => 第 j 列个的框框
		            // x: x+j*2*(R+1)+(R+1)
		            // y: y+i*2*(R+1)+(R+1)
                cxt.arc( x+j*2*(RADIUS+1)+(RADIUS+1) , y+i*2*(RADIUS+1)+(RADIUS+1) , RADIUS , 0 , 2*Math.PI )
                cxt.closePath()

                cxt.fill()
            }
}


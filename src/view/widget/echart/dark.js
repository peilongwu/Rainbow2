define(function() {
  var theme = {
    title:{
      textStyle:{
        color:'#ffffff'
      }
    },
    // 默认色板
    color: [
      '#FE8463','#9BCA63','#FAD860','#60C0DD','#0084C6',
      '#D7504B','#C6E579','#26C0C0','#F0805A','#F4E001',
      '#B5C334'
    ],
    // 图例
    legend: {
      textStyle: {
        color: '#ccc'    // 图例文字颜色
      }
    },
    
    // 值域
    dataRange: {
      color: ['#FFF808','#21BCF9'],
      textStyle: {
        color: '#ccc'    // 值域文字颜色
      }
    },

    toolbox: {
      color : ['#fff', '#fff', '#fff', '#fff'],
      effectiveColor : '#FE8463',
      disableColor: '#666',
    },

    // 提示框
    tooltip: {
      backgroundColor: 'rgba(250,250,250,0.8)',  // 提示背景颜色，默认为透明度为0.7的黑色
      axisPointer : {   // 坐标轴指示器，坐标轴触发有效
        type : 'line',     // 默认为直线，可选为：'line' | 'shadow'
        lineStyle : {    // 直线指示器样式设置
          color: '#aaa'
        },
        crossStyle: {
          color: '#aaa'
        },
        shadowStyle : {      // 阴影指示器样式设置
          color: 'rgba(200,200,200,0.2)'
        }
      },
      textStyle: {
        color: '#333'
      }
    },

    // 区域缩放控制器
    dataZoom: {
      dataBackgroundColor: '#555',      // 数据背景颜色
      fillerColor: 'rgba(200,200,200,0.2)',   // 填充颜色
      handleColor: '#eee'  // 手柄颜色
    },

    // 类目轴
    categoryAxis: {
      axisLabel: {       // 坐标轴文本标签，详见axis.axisLabel
        textStyle: {     // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          color: '#ccc'
        }
      }
    },

    // 数值型坐标轴默认参数
    valueAxis: {
      axisLabel: {       // 坐标轴文本标签，详见axis.axisLabel
        textStyle: {     // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          color: '#ccc'
        }
      },
      splitLine: {       // 分隔线
        lineStyle: {     // 属性lineStyle（详见lineStyle）控制线条样式
          color: ['#aaa'],
        }
      }
    },
    
    polar : {
      name : {
        textStyle: {     // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          color: '#ccc'
        }
      },
      axisLine: {   // 坐标轴线
        lineStyle: {     // 属性lineStyle控制线条样式
          color: '#ddd'
        }
      },
      splitArea : {
        areaStyle : {
          color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)']
        }
      },
      splitLine : {
        lineStyle : {
          color : '#ddd'
        }
      }
    },

    pie: {
      itemStyle: {
        normal: {
          borderColor : 'rgba(255, 255, 255, 0.5)'
        },
        emphasis: {
          borderColor : 'rgba(255, 255, 255, 1)'
        }
      }
    },
    
    force : {
      itemStyle: {
        normal: {
          linkStyle : {
            strokeColor : '#fff'
          }
        }
      }
    },
    gauge : {
      startAngle: 225,
      endAngle : -45,
      axisLine: {   // 坐标轴线
        lineStyle: {     // 属性lineStyle控制线条样式
          color: [[0.2, '#9BCA63'],[0.8, '#60C0DD'],[1, '#D7504B']], 
          width: 3,
        }
      },
      axisTick: {   // 坐标轴小标记
        lineStyle: {     // 属性lineStyle控制线条样式
          color: 'auto',
        }
      },
      axisLabel: {      // 坐标轴小标记
        textStyle: {     // 属性lineStyle控制线条样式
          color: '#fff'
        }
      },
      splitLine: {       // 分隔线
        lineStyle: {     // 属性lineStyle（详见lineStyle）控制线条样式
          color: '#fff',
        }
      },
      title : {
        textStyle: {     // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          color: '#fff'
        }
      },
      detail : {
        offsetCenter: [0, '50%'],    // x, y，单位px
        textStyle: {     // 其余属性默认使用全局文本样式，详见TEXTSTYLE
          fontWeight: 'bolder',
          color: '#fff'
        }
      },
    },
    
    funnel : {
      itemStyle: {
        normal: {
          borderColor : 'rgba(255, 255, 255, 0.5)'
        },
        emphasis: {
          borderColor : 'rgba(255, 255, 255, 1)'
        }
      }
    },
    
    textStyle: {
      fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
    }
  }

  return theme;
});
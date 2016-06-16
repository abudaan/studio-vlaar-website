
export function getBrowser(){
  const ua = navigator.userAgent
  let os
  let browser

  if(ua.match(/(iPad|iPhone|iPod)/g)){
    os = 'ios'
  }else if(ua.indexOf('Android') !== -1){
    os = 'android'
  }else if(ua.indexOf('Linux') !== -1){
    os = 'linux'
  }else if(ua.indexOf('Macintosh') !== -1){
    os = 'osx'
  }else if(ua.indexOf('Windows') !== -1){
    os = 'windows'
  }

  if(ua.indexOf('Chrome') !== -1){
    // chrome, chromium and canary
    browser = 'chrome'

    if(ua.indexOf('OPR') !== -1){
      browser = 'opera'
    }else if(ua.indexOf('Chromium') !== -1){
      browser = 'chromium'
    }
  }else if(ua.indexOf('Safari') !== -1){
    browser = 'safari'
  }else if(ua.indexOf('Firefox') !== -1){
    browser = 'firefox'
  }else if(ua.indexOf('Trident') !== -1){
    browser = 'Internet Explorer'
  }

  if(os === 'ios'){
    if(ua.indexOf('CriOS') !== -1){
      browser = 'chrome'
    }
  }
  return {
    os,
    browser,
    touchEnabled: os === 'ios' || os === 'android'
  }
}

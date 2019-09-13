import ReactGA from 'react-ga'

export const initGA = (trackingID) => {           
  ReactGA.initialize(trackingID) 
}

export const PageView = () => {
  ReactGA.pageview(window.location.pathname + window.location.search) 
}

export const Event = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label
  })
}
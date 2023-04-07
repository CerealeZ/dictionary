import css from "styled-jsx/css"

export const speechsStyles = css`
  .speechs {
    display: flex;
    overflow: auto;
  }
  .speechs__child {
    padding: 5px 15px;
    border: solid 1px #4350ff;
    border-left-width: 0px;
    cursor: pointer;
  }
  .speechs__child:last-child {
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
  }
  .speechs__child:first-child {
    border-left-width: 1px;
    border-top-left-radius: 5px;
    border-bottom-left-radius: 5px;
  }
  .speechs__child--selected {
    background-color: #4350ff;
    color: white;
  }
`

export const wordStyles = css`
  .word {
    display: flex;
    flex-direction: column;
    gap: 20px;
    min-height: 60vh;
  }
  .word:last-child {
    min-height: 20vh;
  }

  .word__header {
    display: flex;
    flex-direction: column;
    font-size: 3rem;
  }
  .word__sounds{
    display: flex;
    gap: 10px;
    color: #4350ff;
  }
  .word__meanings {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  h2 {
    font-weight: 700;
    font-size: 3rem;
    margin: 0;
  }
`

export const meaningStyles = css`
  
`

import { Injectable } from '@angular/core';

declare var webkitSpeechRecognition: any;

@Injectable({
  providedIn: 'root'
})
export class VoiceRecognitionService {

  recognition;
  isStoppedSpeechRecog = false;
  public text = '';
  tempWords;

  constructor() { }

  init(){

    this.recognition = new webkitSpeechRecognition();
    this.recognition.interimResults = true;
    this.recognition.lang = 'fr-FR';

    this.recognition.addEventListener('result', (e) => {
      const transcript = Array.from(e.results)
                        .map((result)=>result[0])
                        .map((result)=>result.transcript)
                        .join('');
      this.tempWords = transcript;
      console.log(transcript);
    });
  }

  start(){
    this.isStoppedSpeechRecog = false;
    this.recognition.start();
    console.log("speech recog started!");
    this.recognition.addEventListener('end', (condition)=>{
      if(this.isStoppedSpeechRecog){
        this.recognition.stop();
        console.log("End speech recog!");
      }else{
        this.wordConcat();
        this.recognition.start();
      }
    });
  }

  stop(){
    this.isStoppedSpeechRecog = true;
    this.wordConcat();
    this.recognition.stop();
    console.log("end speech recog");
  }

  wordConcat() {
    this.text = this.text + ' ' + this.tempWords + '.';
    this.tempWords = '';
  }

}

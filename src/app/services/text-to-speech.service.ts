import { Injectable } from '@angular/core';

import { TextToSpeech, TTSOptions } from '@ionic-native/text-to-speech/ngx';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  options: TTSOptions;

  constructor(private tts: TextToSpeech) {
      // this.options.locale = 'es-ES';
      // this.options.rate = 1;
  }

  textToSpeech(frase: string, rate?: number): Promise<any>{
    console.log(rate);
    // if (rate != null) {
    //   this.options.rate = rate;
    // }
    // this.options.text = frase;
    return this.tts.speak(frase);
  }



}

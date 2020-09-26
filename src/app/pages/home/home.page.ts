import { TextToSpeechService } from './../../services/text-to-speech.service';
import { ApiServerService } from './../../services/api-server.service';
import { Component, OnInit } from '@angular/core';

import { SpeechRecognition, SpeechRecognitionListeningOptions } from '@ionic-native/speech-recognition/ngx';

import { StorageDataService } from './../../services/storage-data.service';
import { UsuarioAppI } from './../../model/usuario-app.model';
import { ApiAuthService } from './../../services/api-auth.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  private usuario: UsuarioAppI = {}; // Usuario aplicacion
  public canSpeech = false;
  options: SpeechRecognitionListeningOptions = {
    language: 'es-ES', // Fijamos el lenguage
    matches: 1, // //Nos devuelve la primera opción de lo que ha escuchado
  };

  constructor(
    private apiAuth: ApiAuthService,
    private storageData: StorageDataService,
    private speechRecognition: SpeechRecognition,
    private api: ApiServerService,
    public tts: TextToSpeechService
  ) {}

  ngOnInit() {
    // Captura el token y lo actualiza en la memoria del telefono
    this.apiAuth.getToken().subscribe((res) => {
      console.log('HomePage::ngOnInit::apiAuth.getToken()::Respuesta: ' + JSON.stringify(res));
      this.usuario.token = res;
      this.storageData.setUser(this.usuario);
    }, (error) => {
      console.error('HomePage::ngOnInit::apiAuth.getToken()::Error: ' + error);
    });
    this.getSpeechLanguages();
    let language = window.navigator.language;
    console.log(language); // works IE/SAFARI/CHROME/FF
    // Comprueba el estado de permisos de voz
    this.checkSpeech();
  }

  enviarComando(){
    if (this.canSpeech) {
      // Enviar voz al servidor
      this.speechRecognition.startListening(this.options).subscribe((frase) => {
        console.log(frase);
        this.api.sendVoice(frase[0]).subscribe((res) => {
          console.log('HomePage::api.sendVoice::Respuesta: ' + JSON.stringify(res));
          this.tts.textToSpeech(res.estan).then((ress) => {
            console.log(ress);
          }).catch((error) => {
            console.log(error);
          });
        }, (error) => {
          console.error('HomePage::api.sendVoice::Error: ' + error);
        });
      }, (error) => {
        console.log(error);
      });
    } else {
      this.checkSpeech();
    }
  }

  checkSpeech() {
     // Comprueba los permisos de escucha
     this.storageData.getItem('speechAvailable').then((canUseSpeech) => {
      // Si no estan aceptados los permisos de escucha, comprueba si hay microfono disponible en el dispositivo
      if (canUseSpeech) {
        this.canSpeech = true;
      } else {
        this.checkSpeechRecognitionAvailable().then((sAvailable) => {
          // Si hay microfono, comprueba si se han aceptado los permisos
          if (sAvailable) {
            this.checkSpeechPermisions().then((isAccept) => {
              // Si estan aceptados los permisos actualiza los permisos en memoria
              if (isAccept) {
                this.storageData.setAvailableSpeech(isAccept);
                this.canSpeech = true;
              } else {
                // Si no estan aceptados los permisos, los pide al usuario y guarda la respuesta en memoria
                this.requestSpeechPermisions().then((ok) => {
                  if (ok) {
                    this.storageData.setAvailableSpeech(ok);
                    this.canSpeech = true;
                  } else{
                    this.storageData.setAvailableSpeech(false);
                  }
                });
              }
            });
          }
        });
      }
    }).catch((error) => {
      console.log('HomePage::ngOnInit::storageData.getItem("speechAvailable")::Error: ', error);
      this.storageData.setAvailableSpeech(false);
    });
  }


  private async checkSpeechPermisions(): Promise<boolean> {
    return this.speechRecognition.hasPermission().then((hasPermission: boolean) => {
      console.log('HomePage::speechRecognition.hasPermission()::ok: ', hasPermission);
      // Request permissions
      return hasPermission;
    }).catch((error) => {
      console.log('HomePage::speechRecognition.hasPermission()::error: ', error);
      return false;
    });
  }

  private async requestSpeechPermisions(): Promise <boolean>{
    return this.speechRecognition.requestPermission().then(
      (r) => {
        console.log('HomePage::speechRecognition.requestPermission()::aceptado:', r);
        return true;
      },
      (r) => {
        console.log('HomePage::speechRecognition.requestPermission()::no aceptado:', r);
        return false;
      }
    ).catch((error) => {
      console.log('HomePage::speechRecognition.requestPermission()::error: ', error);
      return false;
    });
  }

  private async checkSpeechRecognitionAvailable(): Promise<boolean>{
    // Check feature available
    return this.speechRecognition.isRecognitionAvailable().then((available: boolean) => {
      console.log('HomePage::speechRecognition.isRecognitionAvailable()::ok: ', available);
      // Check permission
      return available;
    }).catch((error) => {
      console.log('HomePage::speechRecognition.isRecognitionAvailable()::error: ', error);
      return false;
    });
  }

  private async getSpeechLanguages(): Promise<string[]>{
    return this.speechRecognition.getSupportedLanguages().then(
      (languages: string[]) => {
        console.log('HomePage::speechRecognition.getSupportedLanguages():', languages);
        return languages;
      },
      (error) => {
        console.log('HomePage::speechRecognition.getSupportedLanguages()::error: ', error);
        return [];
      }
    );
  }

}

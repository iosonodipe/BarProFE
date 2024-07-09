import { Component } from '@angular/core';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent {
  faqs = [
    {
      question: 'Come posso prenotare un barman tramite il sito?',
      answer: 'Per prenotare un barman, è sufficiente cercare un barman disponibile nella tua area, visualizzare il suo profilo e fare clic sul pulsante “Prenota Ora”. Segui le istruzioni per completare la prenotazione.'
    },
    {
      question: 'Quali informazioni devo fornire per una prenotazione?',
      answer: 'Durante la prenotazione, ti verranno richieste informazioni come il tuo nome, cognome, email, città, data e ora dell’evento, e dettagli sull’evento.'
    },
    {
      question: 'Posso cancellare o modificare una prenotazione?',
      answer: 'Sì, puoi cancellare o modificare una prenotazione. Accedi al tuo profilo, vai alla sezione “Le mie prenotazioni” e seleziona la prenotazione che desideri modificare o cancellare.'
    },
    {
      question: 'Come posso diventare un barman sul sito?',
      answer: 'Se sei un barman e desideri offrire i tuoi servizi tramite il nostro sito, vai alla sezione “Diventa un Barman” e compila il modulo di registrazione. Dopo la verifica, il tuo profilo sarà attivo.'
    },
    {
      question: 'Cosa include il servizio del barman?',
      answer: 'I servizi variano a seconda del barman, ma generalmente includono la preparazione e il servizio di bevande durante l’evento. Alcuni barman offrono anche consulenze sul menu e la fornitura di ingredienti.'
    },
    {
      question: 'Come posso ottenere un preventivo per il mio evento?',
      answer: 'Puoi ottenere un preventivo contattando direttamente il barman attraverso il suo profilo o utilizzando la sezione “Richiedi un preventivo” sul nostro sito.'
    }
  ];
}

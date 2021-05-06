import { Component, OnInit } from '@angular/core';
import { CryptoAESService } from 'src/shared/crypto/crypto-aes.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
public request = 'do zakodowania ten text!';
public responseEncrypt: string;
public responseDecrypt: string;
  constructor(private crypt: CryptoAESService) { }

  ngOnInit(): void {
    this.responseEncrypt = this.crypt.encryptUsingAES256(this.request);
    this.responseDecrypt = this.crypt.decryptUsingAES256(this.responseEncrypt);
  }

}

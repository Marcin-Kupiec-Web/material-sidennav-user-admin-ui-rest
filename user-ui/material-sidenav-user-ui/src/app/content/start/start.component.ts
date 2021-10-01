import { Component, OnInit } from '@angular/core';
import { CryptoAESService } from 'src/shared/crypto/crypto-aes.service';

@Component({
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss']
})
export class StartComponent implements OnInit {
public request = 'Chcąc chronić dane poufne, musisz je zaszyfrować. Szyfrowanie polega na zamianie zwykłego tekstu na tekst szyfrujący. Odszyfrować go mogą tylko ci, którzy znają klucz. Szyfr - Advanced Encryption Standard (AES) jest zatwierdzony przez amerykańską Agencję Bezpieczeństwa Narodowego (NSA).';
public responseEncrypt: string;
public responseDecrypt: string;
public cryptDecrypt: boolean = false;
  constructor(private crypt: CryptoAESService) { }

  ngOnInit(): void {
    this.responseEncrypt = this.crypt.encryptUsingAES256(this.request);
    this.responseDecrypt = this.crypt.decryptUsingAES256(this.responseEncrypt);
  }

}

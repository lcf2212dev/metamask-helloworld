import { AfterViewInit, Component, OnInit } from "@angular/core";
import { BehaviorSubject } from "rxjs";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  msg = "";
  window: any = window;
  eth: any = this.window.ethereum;
  show = false;
  awaitConnect = false;
  errorMessage: string | null = null;
  accounts$ = new BehaviorSubject<string[] | null>(null);

  constructor() {
    this.eth.on("chainChanged", (chainId: any) => {
      console.log(chainId);
      window.location.reload();
    });
  }

  version(n: number): string {
    return Network[n];
  }

  showDetails() {
    this.show = true;
  }

  connect() {
    this.awaitConnect = true;
    this.errorMessage = null;
    this.eth.request({ method: "eth_requestAccounts" }).then(
      (accounts: string[]) => {
        this.accounts$.next(accounts);
        this.awaitConnect = false;
      },
      (error: any) => {
        this.errorMessage = error.message;
        this.awaitConnect = false;
      }
    );
  }
}

enum Network {
  "Ethereum Main Network" = 1,
  "Ropsten Test Network" = 3,
  "Rinkeby Test Network" = 4,
  "Goerli Test Network" = 5,
  "Kovan Test Network" = 42,
}

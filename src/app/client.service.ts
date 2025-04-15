import { Injectable } from '@angular/core';
import { Client } from '../app/cadastro/client';


@Injectable({
  providedIn: 'root'
})
export class ClientService {

  static REPO_CLIENTS = "_CLEINTS"

  constructor() { }

  save(client: Client) {
    const storage = this.getStorage()

    storage.push(client)

    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage))
  }

  delete(id: string) {
    const storage = this.getStorage()

    const index = storage.findIndex(c => c.id === id)

    if(index >= 0) {
      storage.splice(index, 1)
    }

    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage))
  }


  update(client: Client) {
    const storage = this.getStorage()

    // const index = storage.findIndex(c => c.id === client.id)

    // if(index >= 0) {
    //   storage[index] = client
    // }
    storage.forEach(c => {
      if(c.id === client.id) {
        Object.assign(c, client)
      }
    })

    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(storage))
  }

  search(name: string): Client[] {
    const clients = this.getStorage()

    if(!name) {
      return clients
    }

    return clients.filter(client => client.name?.includes(name))
  }
  
  getClientByID(id: string) : Client | undefined {
    const clients = this.getStorage()
    return clients.find(client => client.id === id)
  }

  private getStorage() : Client[] {
    let clientsRepo = localStorage.getItem(ClientService.REPO_CLIENTS)
    if (clientsRepo) {
      const clients: Client[] = JSON.parse(clientsRepo)
      return clients
    }

    const clients: Client[] = []
    localStorage.setItem(ClientService.REPO_CLIENTS, JSON.stringify(clients))
    return clients
  }

}

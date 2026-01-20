export class Taks {
  constructor(
    private title: string,
    private description: string,
    private dueDate: string,
    private status: boolean,
    private createdBy: number,
    private assignedTo: number,
    private id: string,
  ) {}

  // Getters
  getTitle(): string {
    return this.title;
  }

  getDescription(): string {
    return this.description;
  }

  getDueDate(): string {
    return this.dueDate;
  }

  getStatus(): boolean {
    return this.status;
  }

  getCreatedBy(): number {
    return this.createdBy;
  }

  getAssignedTo(): number {
    return this.assignedTo;
  }

  getId(): string {
    return this.id;
  }

  // Setters
  setTitle(title: string): void {
    this.title = title;
  }

  setDescription(description: string): void {
    this.description = description;
  }

  setDueDate(dueDate: string): void {
    this.dueDate = dueDate;
  }

  setStatus(status: boolean): void {
    this.status = status;
  }

  setCreatedBy(createdBy: number): void {
    this.createdBy = createdBy;
  }

  setAssignedTo(assignedTo: number): void {
    this.assignedTo = assignedTo;
  }

  setId(id: string): void {
    this.id = id;
  }
}

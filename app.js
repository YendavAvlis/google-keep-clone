class App {
    constructor() {
        this.notes = []

        this.$form = document.querySelector('#form');
        this.$noteTitle = document.querySelector('#note-title');
        this.$noteText = document.querySelector('#note-text');
        this.$formButtons = document.querySelector('#form-buttons');

        this.$notes = document.querySelector('#notes');
        this.$placeholder = document.querySelector('#placeholder')

        this.addEventListeners()
    }

    addEventListeners() {
        document.body.addEventListener('click', e => {
            this.handleFormClick(e)
        });

        this.$form.addEventListener('submit', e => {
            e.preventDefault();
            const title = this.$noteTitle.value;
            const text = this.$noteText.value;

            const hasNote = title || text;

            if (hasNote){
                this.addNote({
                    title,
                    text
                })
            }
        });
    }

        handleFormClick(e) {
        const isFormClicked = this.$form.contains(e.target)

        if(isFormClicked) {
            this.openForm();
        } else {
            this.closeForm();
        }
    }

        openForm() {
        this.$form.classList.add('form-open')
        this.$noteTitle.style.display = 'block'
        this.$formButtons.style.display = 'block'
    }

        closeForm() {
        this.$form.classList.remove('form-open')
        this.$noteTitle.style.display = 'none'
        this.$formButtons.style.display = 'none'
        this.$noteTitle.value = ''
        this.$noteText.value = ''
    }

    addNote(note) {
        const newNote = {
            title: note.title,
            text: note.text,
            color: 'white',
            id: this.notes.length > 0 ? this.notes[this.notes.length - 1].id + 1: 1
        };
        this.notes = [...this.notes, newNote];
        this.displayNotes();
        this.closeForm();
    }

    displayNotes() {
        const hasNotes = this.notes.length > 0;
        this.$placeholder.style.display = hasNotes ? 'none' : 'flex';

        this.$notes.innerHTML = this.notes.map(note => `
                <div style="background:${note.color};" class="note">
                    <div class="${note.title && 'note-title'}">
                        ${note.title}
                    </div>
                    <div class="note-text">
                        ${note.text}
                    </div>
                    <div class="toolbar-container">
                        <div class="toolbar">
                            <i class="fa-solid fa-palette fa-xl toolbar-color"></i>
                            <i class="fa-solid fa-trash fa-xl toolbar-delete"></i>
                        </div>
                    </div>
                </div>
            `).join('')
    }
}



new App()
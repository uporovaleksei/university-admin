export const fileUploadMixin = {
  methods: {
    handleFileUpload(event) {
      const files = Array.from(event.target.files)
      const file = files[0]
      this.format = file.name.match(/\.([^.]+)$/)[1]
      const reader = new FileReader()
      reader.onload = ev => {
        const src = ev.target.result
        this.preview = src
        this.data = reader.result
      }
      reader.readAsDataURL(file)
    },
    ChangehandleFileUpload(event) {
      const files = Array.from(event.target.files)
      const file = files[0]

      const reader = new FileReader()
      reader.onload = ev => {
        const src = ev.target.result
        this.changeImage = src
      }
      reader.readAsDataURL(file)
    },
  },
}

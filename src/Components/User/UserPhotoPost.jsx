import React from 'react'
import styles from './UserPhotoPost.module.css'
import useForm from '../../Hooks/useForm'
import useFetch from '../../Hooks/useFetch'
import Input from '../Forms/Input'
import Button from '../Forms/Button'
import Error from '../Helper/Error'
import { PHOTO_POST } from '../../api'
import { useNavigate } from 'react-router-dom'

const UserPhotoPost = () => {
  const nome = useForm()
  const peso = useForm('number')
  const idade = useForm('number')
  const [image, setImg] = React.useState({})
  const { data, error, loading, request } = useFetch()
  const navigate = useNavigate()

  React.useEffect(() => {
    if (data) navigate('/conta')
  }, [data, navigate])

  function handleSubmit(event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append('img', image.raw)
    formData.append('nome', nome.value)
    formData.append('peso', peso.value)
    formData.append('idade', idade.value)

    const token = window.localStorage.getItem('token')
    const { url, options } = PHOTO_POST(formData, token)
    request(url, options)
  }

  function handleFile(file) {
    if (!file) return

    setImg({
      preview: URL.createObjectURL(file),
      raw: file,
    })
  }

  function handleImgChange(event) {
    handleFile(event.target.files[0])
  }

  function handleDragOver(event) {
    event.preventDefault()
  }

  function handleDrop(event) {
    event.preventDefault()
    handleFile(event.dataTransfer.files[0])
  }

  return (
    <section className={`${styles.photoPost} animeLeft`}>
      <form onSubmit={handleSubmit} className={styles.form}>
        <Input label="Nome" type="text" name="nome" {...nome} />
        <Input label="Peso" type="number" name="peso" {...peso} />
        <Input label="Idade" type="number" name="idade" {...idade} />

        {/* DROPZONE */}
        <div
          className={styles.dropZone}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
        >
          <p>Arraste a imagem aqui</p>
          <span>ou clique para selecionar</span>

          <input
            className={styles.file}
            type="file"
            name="img"
            id="img"
            accept="image/jpeg, image/png"
            onChange={handleImgChange}
          />
        </div>

        {loading ? <Button disabled>Postar</Button> : <Button>Postar</Button>}
        <Error />
      </form>

      <div className={styles.previewWrapper}  >
        {image.preview && (
          <div
            className={styles.preview}
            style={{ backgroundImage: `url(${image.preview})` }}
          />
        )}
      </div>

      {loading && <p>Enviando...</p>}
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {data && <p>Foto enviada com sucesso ✅</p>}
    </section>
  )
}

export default UserPhotoPost

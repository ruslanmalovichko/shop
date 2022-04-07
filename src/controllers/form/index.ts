import { Response, Request } from 'express'
import FormContact from '../../models/formContact'
import { IFormContact } from '../../types/formContact'
import SMTPTransport from 'nodemailer/lib/smtp-transport'
import nodemailer from 'nodemailer'
import 'dotenv/config'

const MAIL_HOST = process.env.MAIL_HOST
const MAIL_PORT = Number(process.env.MAIL_PORT)
const MAIL_USER = process.env.MAIL_USER
const MAIL_PASS = process.env.MAIL_PASS

const contactForm = async (req: Request, res: Response): Promise<void> => {
  try {
    const output = `
      <p>You have a message</p>
      <h3>Contact Details</h3>
      <p>Name: ${req.body.name}</p>
      <p>Email: ${req.body.email}</p>
      <h3>Message</h3>
      <p>${req.body.message}</p>
    `;

    let transporter

    if (
      typeof MAIL_HOST === 'string' &&
      typeof MAIL_PORT === 'number' &&
      typeof MAIL_USER === 'string' &&
      typeof MAIL_PASS === 'string'
    ) {
      const smtpConfig: SMTPTransport.Options = {
        host: MAIL_HOST,
        port: MAIL_PORT,
        secure: false,
        auth: {
          user: MAIL_USER,
          pass: MAIL_PASS
        },
        tls:{
          rejectUnauthorized:false
        }
      }

      transporter = nodemailer.createTransport(smtpConfig);

      let mailOptions = {
        from: '"Contact Me" <noreply@example.com>',
        to: 'ruslan.malovichko@wearebrain.com',
        subject: 'Contact Us',
        html: output
      };

      transporter.sendMail(mailOptions, async (error, info) => {
        if (error) {
          res.status(401).send({ message: 'Error with sending email' })
          return
        }

        const newFormContact: IFormContact = new FormContact({
          messageId: info.messageId,
          message: req.body.message,
          name: req.body.name,
          email: req.body.email,
          from: info.envelope.from,
          to: info.envelope.to[0],
          subject: mailOptions.subject
        })

        await newFormContact.save()

        res.status(200).send({ message: 'Email has been sent' })
        return
      })
    }
    return
  } catch (error) {
    // res.status(500).send({ message: error })
    console.log(error)
    throw error
  }
}

export { contactForm }
